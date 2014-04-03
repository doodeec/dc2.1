'use strict';

(function (ng) {
    function widgetProvider() {
        var allWidgets = {};

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
            var wgt, wgtsInPosition = [],
                i = 0, len,
                position = 0;
            for (wgt in allWidgets) {
                if (allWidgets[wgt].position === this.position) {
                    wgtsInPosition.push(allWidgets[wgt]);
                }
            }

            for (len = wgtsInPosition.length; i < len; i++) {
                if (wgtsInPosition[i].priority > this.priority) position++;
            }
            return position;
        };

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
         * @returns {{all: {}, create: saveFn, loadAll: loadAll, load: load, save: saveFn, remove: remove}}
         */
        function getFn($http) {
            var saveFn = function (wgt) {
                    return $http.post('/api/widget', wgt)
                        .then(function (wgt) {
                            saveRef(wgt);
                            return wgt;
                        });
                };

            return {
                all: allWidgets,
                create: saveFn,
                loadAll: function () {
                    return $http.get('/api/widgets')
                        .then(function (wgts) {
                            saveRef(wgts.data);
                            return allWidgets;
                        });
                },
                load: function (id) {
                    return (id in this.all) ? this.all[id] : null;
                },
                save: saveFn,
                remove: function (id) {
                    return $http.delete('/api/widget', id)
                        .then(function () {
                            removeRef(id);
                            return arguments;
                        })
                }
            }
        }

        getFn.$inject = ['$http'];
        this.$get = getFn;
    }

    // register provider in angular
    ng.module('dc-widgets', []).provider('Widget', widgetProvider);
})(angular);