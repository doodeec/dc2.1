'use strict';

angular.module('dc-loader', [])
    .factory('LoaderService', function ($timeout) {
        var loaderTasks = [];
        var deferedTasks = {};

        function isTemplate(url) {
            return Boolean(/partials\//i.test(url));
        }

        return {
            activeLoader: function () {
                return loaderTasks.length;
            },
            register: function (id) {
                if (isTemplate(id)) return;

                if (loaderTasks.indexOf(id) === -1 && !(id in deferedTasks)) {
                    deferedTasks[id] = $timeout(function () {
                        loaderTasks.push(id);
                        deferedTasks[id] = null;
                        delete deferedTasks[id];
                    }, 500);
                }
            },
            unregister: function (id) {
                if (isTemplate(id)) return;

                var index = loaderTasks.indexOf(id);
                if (index !== -1) loaderTasks.splice(index, 1);

                if (id in deferedTasks) {
                    $timeout.cancel(deferedTasks[id]);
                    deferedTasks[id] = null;
                    delete deferedTasks[id];
                }
            }
        }
    });