'use strict';

(function (ng) {
    function widgetProvider() {
        var allWidgets = {},
            allTypes = ['default'];

        //TODO manage widget types (+registration)

        /**
         * Widget constructor
         * @param properties
         * @constructor
         */
        function Widget(properties) {
            this.id = properties.id;
            this.position = properties.position;
            this.priority = properties.priority;
            this.size = properties.size;
            this.widgetType = properties.widgetType;
            this.vAlign = properties.vAlign;
            this.hAlign = properties.hAlign;
            //TODO
        }

        Widget.prototype.getSize = function () {
            return [this.size.x, this.size.y];
        };

        /**
         * Returns priority index in its UI position
         * @returns {number}
         */
        Widget.prototype.getPosition = function () {
            var wgtsInPosition = getPositionStack(this.position),
                i = 0, len,
                position = 0;

            for (len = wgtsInPosition.length; i < len; i++) {
                if (wgtsInPosition[i].priority > this.priority) position++;
            }
            return position;
        };

        /**
         * Returns unordered array of all widgets in certain position
         * @param position
         * @returns {Array}
         */
        function getPositionStack(position) {
            var wgt, wgtsInPosition = [];

            for (wgt in allWidgets) {
                if (angular.isUndefined(position) || allWidgets[wgt].position === position) {
                    wgtsInPosition.push(allWidgets[wgt]);
                }
            }
            return wgtsInPosition;
        }

        /**
         * Returns ordered array of all widgets in certain position
         * (according to their priority)
         * @param position
         * @returns {Array}
         */
        function getOrderedPositionStack(position) {
            return getPositionStack(position).sort(function (a, b) {
                return a.priority - b.priority;
            });
        }

        /**
         * Save widget reference in memory
         * @param {Object/Array} wgt - widget/s to save
         * @returns {Object/Array} references
         */
        function saveRef(wgt) {
            if (angular.isArray(wgt)) {
                var i = 0, len = wgt.length, widget, returnArr = [];
                for (; i < len, widget = wgt[i]; i++) {
                    returnArr.push(saveRef(widget));
                }
                return returnArr;
            } else if (!angular.isObject(wgt)) return null;

            //check possible wgt types
            if (allTypes.indexOf(wgt.widgetType) === -1) {
                throw new Error('Widget type "' + wgt.widgetType + '" not allowed.');
            }

            // transform mongo object/s
            return allWidgets[wgt.id] = new Widget(wgt);
        }

        /**
         * Clears reference in memory
         * @param {String} wgtId - widget ID
         */
        function removeRef(wgtId) {
            if (angular.isUndefined(wgtId)) return;

            delete allWidgets[wgtId];
        }

        /**
         * Widget Provider
         * @param $http
         * @returns {{all: {}, create: saveFn, save: saveFn, getStack: getOrderedPositionStack, loadAll: loadAll, load: load, remove: remove}}
         */
        function getFn($http) {
            var saveFn = function (wgt) {
                return $http.post('/api/widget', wgt)
                    .then(function (wgt) {
                        saveRef(wgt.data);
                        return wgt.data;
                    });
            };

            return {
                all: allWidgets,
                create: saveFn,
                save: saveFn,
                getStack: getOrderedPositionStack,
                loadAll: function () {
                    return $http.get('/api/widgets')
                        .then(function (wgts) {
                            saveRef(wgts.data);
                            return getPositionStack();
                        });
                },
                load: function (id) {
                    return (id in this.all) ? this.all[id] : null;
                },
                remove: function (id) {
                    return $http.delete('/api/widget', id)
                        .then(function () {
                            removeRef(id);
                            return arguments;
                        })
                },
                registerType: function (type) {
                    if (allTypes.indexOf(type) === -1) allTypes.push(type);
                }
            }
        }

        getFn.$inject = ['$http'];
        this.$get = getFn;
    }

    // register provider in angular
    ng.module('dc-widgets', []).provider('Widget', widgetProvider);
})(angular);