'use strict';

angular.module('dc-blog', [])
    .factory('BlogService', function ($http) {

        return {
            loadBlog: function () {
                return $http.get('/api/blogs/home');
            },
            loadAllBlogs: function () {
                return $http.get('/api/blogs');
            }
        };
    });