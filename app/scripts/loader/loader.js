'use strict';

angular.module('dc-loader', [])
    .factory('LoaderService', function ($timeout) {
        var loaderTasks = [];
        var deferedTasks = {};

        function isTemplate(url) {
            return Boolean(/partials\//i.test(url));
        }

        return {
            /**
             * Indicates if loader should or shouldn't be displayed
             * @returns {Number}
             */
            activeLoader: function () {
                return loaderTasks.length;
            },
            /**
             * Register defered task for showing a Loader
             * @param id
             */
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
            /**
             * Unregister loader task and its defered task
             * @param id
             */
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