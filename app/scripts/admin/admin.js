'use strict';

angular.module('dc-admin', [])
    .factory('Admin', function ($http) {
        return {
            /**
             * Loads blog with defined id
             * @param {String} id - blog id
             * @returns {Object} $http promise
             */
            loadBlog: function (id) {
                if (!angular.isDefined(id)) throw new Error('Missing blog id');
                return $http.get('/api/blog', {params: {id: id}});
            },
            /**
             * Loads all blogs
             * @returns {Object} $http promise
             */
            loadAllBlogs: function () {
                return $http.get('/api/blogs');
            },
            /**
             * Creates new blog
             * @param {Object} params - new blog properties
             * @returns {Object} $http promise
             */
            createBlog: function (params) {
                if (!angular.isObject(params)) throw new Error('Wrong parameter type');
                return $http.post('/api/blog/create', params);
            },
            /**
             * Updates blog data
             * @param {Object} data - changed blog properties and blog id
             * @returns {Object} $http promise
             */
            editBlog: function (data) {
                if (!angular.isObject(data)) throw new Error('Wrong parameter type');
                return $http.post('/api/blog/save', data);
            },
            /**
             * Deletes blog with specific id
             * @param {String} id
             * @returns {Object} $http promise
             */
            deleteBlog: function (id) {
                if (!angular.isDefined(id)) throw new Error('Missing blog id');
                return $http.post('/api/blog/delete', id);
            },
            publishBlog: function () {
            },
            loadProject: function () {
            },
            createProject: function () {
            },
            editProject: function () {
            },
            deleteProject: function () {
            }
        };
    });