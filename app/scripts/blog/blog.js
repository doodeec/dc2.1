'use strict';

angular.module('dc-blog', [])
    .factory('BlogService', function ($http, $q) {
        var localCache = {},
            blogKey = 'blog.';

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
             * Loads single blog with specified ID
             * @param {String} id
             * @returns {Object} $http promise
             */
            loadBlog: function (id) {
                var cache = checkCache(blogKey + id);

                return $q.when(cache || $http.get('/api/blog', {params: {id: id}})
                    .then(function (blog) {
                        saveToCache(blogKey, blog.data);
                        return $q.when(blog);
                    }));
            },
            /**
             * Loads all blogs allowed on a home page
             * Promise returns an array of blogs
             * @returns {Object} $http promise
             */
            loadBlogs: function () {
                return $http.get('/api/blogs/home')
                    .then(function (blogs) {
                        saveToCache(blogKey, blogs.data);
                        return $q.when(blogs);
                    });
            },
            /**
             * Loads all existing blogs
             * Promise returns an array of blogs
             * @returns {Object} $http promise
             */
            loadAllBlogs: function () {
                return $http.get('/api/blogs')
                    .then(function (blogs) {
                        saveToCache(blogKey, blogs.data);
                        return $q.when(blogs);
                    });
            }
        };
    });