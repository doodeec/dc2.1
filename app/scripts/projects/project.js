'use strict';

angular.module('dc-project', [])
    .factory('ProjectService', function ($http, $q, $cacheFactory) {
        var localCache = $cacheFactory('projects'),
            projectKey = 'project.';

        function checkCache(key) {
            var data = localCache.get(key);
            return (data) ? { status: 200, data: data } : false;
        }

        function saveToCache(type, data) {
            if (angular.isArray(data)) {
                var i = 0, len = data.length;
                for (; i < len; i++) {
                    saveToCache(type, data[i]);
                }
            } else if (angular.isObject(data)) {
                localCache.put(type + data.id, data);
            }
        }

        return {
            /**
             * Loads single project with specified ID
             * @param {String} id
             * @returns {Object} promise
             */
            loadProject: function (id) {
                return $q.when(checkCache(projectKey + id) || $http.get('/api/project', {params: {id: id}})
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