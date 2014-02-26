'use strict';

angular.module('dc-blog', [])
    .factory('BlogService', function ($http) {

        return {
            /**
             * Loads single blog with specified ID
             * @param {String} id
             * @returns {Object} $http promise
             */
            loadBlog: function (id) {
                return $http.get('/api/blog', {params: {id: id}});
            },
            /**
             * Loads all blogs allowed on a home page
             * Promise returns an array of blogs
             * @returns {Object} $http promise
             */
            loadBlogs: function () {
                return $http.get('/api/blogs/home');
            },
            /**
             * Loads all existing blogs
             * Promise returns an array of blogs
             * @returns {Object} $http promise
             */
            loadAllBlogs: function () {
                return $http.get('/api/blogs');
            }
        };
    });