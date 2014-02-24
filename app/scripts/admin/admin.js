'use strict';

angular.module('dc-admin', [])
    .factory('Admin', function ($http) {
        return {
            loadBlog: function (id) {
                if (!angular.isDefined(id)) throw new Error('Missing blog id');
                return $http.get('/api/blog', {params: {id: id}});
            },
            loadAllBlogs: function () {
                return $http.get('/api/blogs');
            },
            createBlog: function (params) {
                if (!angular.isObject(params)) throw new Error('Wrong parameter type');
                return $http.post('/api/blog/create', params);
            },
            editBlog: function (data) {
                if (!angular.isObject(data)) throw new Error('Wrong parameter type');
                return $http.post('/api/blog/save', data);
            },
            deleteBlog: function () {
            },
            publishBlog: function () {
            },
            createProject: function () {
            },
            editProject: function () {
            }
        };
    });