'use strict';

angular.module('dc-admin', ['dc-loader'])
    .factory('Admin', function ($http, $q) {
        var errorStrings = {
            misProjId: 'Missing project id',
            misBlogId: 'Missing blog id',
            typeError: 'Wrong parameter type'
        };

        var localCache = {};

        function checkLocalCache(key) {
            return (key in localCache) ? { status: 200, data: localCache[key] } : false;
        }

        function storeCache(key, data) {
            if (!angular.isDefined(data.data)) return;

            if (angular.isArray(data.data)) {
                var i = 0, len = data.data.length, item;
                for (; i < len, item = data.data[i]; i++) {
                    localCache[key + item.id] = item;
                }
            } else {
                localCache[key] = data;
            }
        }

        return {
            /**
             * Loads blog with defined id
             * @param {String} id
             * @returns {Object} promise
             */
            loadBlog: function (id) {
                if (!angular.isDefined(id)) throw new Error(errorStrings.misBlogId);
                var defer = $q.defer(),
                    cache = checkLocalCache('blog.' + id);

                if (cache) {
                    defer.resolve(cache);
                } else {
                    $http.get('/api/blog', {params: {id: id}}).then(function (data) {
                        storeCache('blog.' + id, data);
                        defer.resolve(data);
                    }, defer.reject);
                }

                return defer.promise;
            },
            /**
             * Loads all blogs
             * @returns {Object} promise
             */
            loadAllBlogs: function () {
                var defer = $q.defer();

                $http.get('/api/blogs').then(function (data) {
                    storeCache('blog.', data);
                    defer.resolve(data);
                }, defer.reject);

                return defer.promise;
            },
            /**
             * Creates new blog
             * @param {Object} params - new blog properties
             * @returns {Object} $http promise
             */
            createBlog: function (params) {
                if (!angular.isObject(params)) throw new Error(errorStrings.typeError);
                return $http.post('/api/blog/create', params);
            },
            /**
             * Updates blog data
             * @param {Object} data - changed blog properties and blog id
             * @returns {Object} $http promise
             */
            editBlog: function (data) {
                if (!angular.isObject(data)) throw new Error(errorStrings.typeError);
                return $http.post('/api/blog/save', data);
            },
            /**
             * Deletes blog with specific id
             * @param {String} id
             * @returns {Object} $http promise
             */
            deleteBlog: function (id) {
                if (!angular.isDefined(id)) throw new Error(errorStrings.misBlogId);
                return $http.post('/api/blog/delete', { id: id });
            },
            /**
             * Publishes blog into home page
             * @param {String} id
             * @returns {Object} $http promise
             */
            publishBlog: function (id) {
                if (!angular.isDefined(id)) throw new Error(errorStrings.misBlogId);
                return this.editBlog({id: id, allowedHome: true});
            },
            /**
             * Unpublishes blog from home page
             * @param {String} id
             * @returns {Object} $http promise
             */
            unpublishBlog: function (id) {
                if (!angular.isDefined(id)) throw new Error(errorStrings.misBlogId);
                return this.editBlog({id: id, allowedHome: false});
            },
            /**
             * Loads all projects
             * @returns {Object} $http promise
             */
            loadAllProjects: function () {
                var defer = $q.defer();

                $http.get('/api/projects').then(function (data) {
                    storeCache('project.', data);
                    defer.resolve(data);
                }, defer.reject);

                return defer.promise;
            },
            /**
             * Loads project with specific id
             * @param {String} id
             * @returns {Object} $http promise
             */
            loadProject: function (id) {
                if (!angular.isDefined(id)) throw new Error(errorStrings.misProjId);
                var defer = $q.defer(),
                    cache = checkLocalCache('project.' + id);

                if (cache) {
                    defer.resolve(cache);
                } else {
                    $http.get('/api/project', {params: {id: id}}).then(function (data) {
                        storeCache('project.' + id, data);
                        defer.resolve(data);
                    }, defer.reject);
                }

                return defer.promise;
            },
            /**
             * Creates new project
             * @param {Object} params - new project properties
             * @returns {Object} $http promise
             */
            createProject: function (params) {
                if (!angular.isObject(params)) throw new Error(errorStrings.typeError);
                return $http.post('/api/project/create', params);
            },
            /**
             * Updates existing project with
             * @param {Object} data - changed project properties and project id
             * @returns {Object} $http promise
             */
            editProject: function (data) {
                if (!angular.isObject(data)) throw new Error(errorStrings.typeError);
                return $http.post('/api/project/save', data);
            },
            /**
             * Deletes project with specific id
             * @param {String} id
             * @returns {Object} $http promise
             */
            deleteProject: function (id) {
                if (!angular.isDefined(id)) throw new Error(errorStrings.misBlogId);
                return $http.post('/api/project/delete', id);
            }
        };
    });