'use strict';

angular.module('dc-project', [])
    .factory('ProjectService', function ($http, $q) {
        var localCache = {},
            projectKey = 'project.';

        function checkCache(key) {
            return (key in localCache) ? { status: 200, data: localCache[key] } : false;
        }

        function saveToCache(type, data) {
            if (angular.isArray(data)) {
                var i = 0, len = data.length;
                for (; i < len; i++) {
                    saveToCache(type, data[i]);
                }
            } else if (angular.isObject(data)) {
                localCache[type + data.id] = data;
            }
        }

        return {
            /**
             * Loads single project with specified ID
             * @param {String} id
             * @returns {Object} promise
             */
            loadProject: function (id) {
                var cache = checkCache(projectKey + id);

                return $q.when(cache || $http.get('/api/project', {params: {id: id}})
                    .then(function (project) {
                        saveToCache(projectKey, project.data);
                        return $q.when(project);
                    }));
            },
            /**
             * Loads all existing projects
             * Resolved promise returns an array of projects
             * @returns {Object} $http promise
             */
            loadAllProjects: function () {
                return $http.get('/api/projects')
                    .then(function (projects) {
                        saveToCache(projectKey, projects.data);
                        return $q.when(projects);
                    });
            }
        };
    });