'use strict';

angular.module('dc-blog', [])
    .factory('BlogService', function ($http, $q, CacheService) {
        var localCache = CacheService.get('blogs'),
            blogKey = 'blog.';

        return {
            /**
             * Loads single blog with specified ID
             * @param {String} id
             * @returns {Object} $http promise
             */
            loadBlog: function (id) {
                return $q.when(localCache.load(blogKey + id) || $http.get('/api/blog', {params: {id: id}})
                    .then(function (blog) {
                        localCache.save(blogKey, blog.data);
                        return blog;
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
                        localCache.save(blogKey, blogs.data);
                        return blogs;
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
                        localCache.save(blogKey, blogs.data);
                        return blogs;
                    });
            }
        };
    });