'use strict';

angular.module('dc-project', [])
    .factory('ProjectService', function ($http, $q) {
        var localCache = {};

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
                var defer = $q.defer(),
                    cache = checkCache('project.' + id);

                if (cache) {
                    defer.resolve(cache);
                } else {
                    $http.get('/api/project', {params: {id: id}}).then(function (project) {
                        saveToCache('project.', project.data);
                        defer.resolve(project);
                    }, defer.reject);
                }

                return defer.promise;
            },
            /**
             * Loads all existing projects
             * Resolved promise returns an array of projects
             * @returns {Object} $http promise
             */
            loadAllProjects: function () {
                var defer = $q.defer();

                $http.get('/api/projects').then(function (projects) {
                    saveToCache('project.', projects.data);
                    defer.resolve(projects);
                }, defer.reject);

                return defer.promise;
            }
        };
    });