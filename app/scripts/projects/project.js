'use strict';

angular.module('dc-project', [])
    .factory('ProjectService', function ($http, $q, CacheService) {
        var localCache = CacheService.get('projects'),
            projectKey = 'project.';

        return {
            /**
             * Loads single project with specified ID
             * @param {String} id
             * @returns {Object} promise
             */
            loadProject: function (id) {
                return $q.when(localCache.load(projectKey + id) || $http.get('/api/project', {params: {id: id}})
                    .then(function (project) {
                        localCache.save(projectKey, project.data);
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
                        localCache.save(projectKey, projects.data);
                        return $q.when(projects);
                    });
            }
        };
    });