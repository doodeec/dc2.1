'use strict';

(function (ng) {
    function widgetProvider() {
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

        Widget.prototype.destroy = function () {
            //TODO
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
                    returnArr.push(saveRef.call(this, widget));
                }
                return returnArr;
            } else if (!angular.isObject(wgt)) return null;

            // transform mongo object/s
            return this.allWidgets[wgt.id] = new Widget(wgt);
        }

        /**
         * Clears reference in memory
         * @param {String} wgtId - widget ID
         */
        function removeRef(wgtId) {
            if (angular.isUndefined(wgtId)) return;

            delete this.allWidgets[wgtId];
        }

        /**
         * Widget Provider
         * @param $http
         * @returns {{all: ({}|*), loadAll: loadAll, load: load, save: save, remove: remove}}
         */
        function getFn($http) {
            var saveWgtRef = saveRef.bind(this),
                removeWgtRef = removeRef.bind(this),
                allW = this.allWidgets;

            return {
                all: allW,
                loadAll: function () {
                    return $http.get('/api/widgets')
                        .then(function (wgts) {
                            saveWgtRef(wgts.data);
                            return allW;
                        });
                },
                load: function (id) {
                    return (id in this.all) ? this.all[id] : null;
                },
                save: function (wgt) {
                    return $http.post('/api/widget', wgt)
                        .then(function () {
                            saveWgtRef(wgt);
                            return arguments;
                        });
                },
                remove: function (id) {
                    return $http.delete('/api/widget', id)
                        .then(function () {
                            removeWgtRef(id);
                            return arguments;
                        })
                }
            }
        }

        this.allWidgets = {};

        getFn.$inject = ['$http'];
        this.$get = getFn;
    }

    // register provider in angular
    ng.module('dc-widgets', []).provider('Widget', widgetProvider);
})(angular);