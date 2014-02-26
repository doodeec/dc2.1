'use strict';

angular.module('dc-project', [])
    .factory('ProjectService', function ($http) {

        return {
            /**
             * Loads single project with specified ID
             * @param {String} id
             * @returns {Object} $http promise
             */
            loadProject: function (id) {
                return $http.get('/api/project', {params: {id: id}});
            },
            /**
             * Loads all existing projects
             * Resolved promise returns an array of projects
             * @returns {Object} $http promise
             */
            loadAllProjects: function () {
                return $http.get('/api/projects');
            }
        };
    });