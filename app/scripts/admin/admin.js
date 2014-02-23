'use strict';

angular.module('dc-admin', [])
    .factory('Admin', function (BlogService) {
        return {
            loadAllBlogs: BlogService.loadAllBlogs,
            createBlog: function () {
            },
            editBlog: function () {
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