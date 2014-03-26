'use strict';

(function (ng) {
    function widgetProvider() {
        function saveRef(wgt) {
            if (angular.isArray(wgt)) {
                var i = 0, len = wgt.length, widget;
                for (; i < len, widget = wgt[i]; i++) {
                    saveRef.call(this, widget);
                }
                return;
            } else if (!angular.isObject(wgt)) return;

            this.allWidgets[wgt.id] = wgt;
        }

        function removeRef(wgtId) {
            if (angular.isUndefined(wgtId)) return;

            delete this.allWidgets[wgtId];
        }

        function getFn($http) {
            var saveWgtRef = saveRef.bind(this),
                removeWgtRef = removeRef.bind(this),
                allW = this.allWidgets;

            return {
                all: allW,
                loadAll: function (reference) {
                    return $http.get('api/widgets')
                        .then(function (wgts) {
                            saveWgtRef(wgts.data);
                            return wgts.data;
                        });
                },
                load: function (id) {
                    return $http.get('api/widget', {id: id})
                        .then(function (widget) {
                            saveWgtRef(widget);
                            return widget;
                        });
                },
                save: function (wgt) {
                    return $http.post('api/widget', wgt)
                        .then(function () {
                            saveWgtRef(wgt);
                            return arguments;
                        });
                },
                remove: function (id) {
                    return $http.delete('api/widget', id)
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

    ng.module('dc-widgets', []).provider('Widget', widgetProvider);
})(angular);