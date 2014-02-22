'use strict';

angular.module('dc-blog', [])
    .factory('BlogService', function ($http) {

        return {
            loadBlog: function (id) {
                return $http.get('/api/blog', {params: {id: id}});
            },
            loadBlogs: function () {
                return $http.get('/api/blogs/home');
            },
            loadAllBlogs: function () {
                return $http.get('/api/blogs');
            }
        };
    });