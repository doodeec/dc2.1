'use strict';

angular.module('dc-admin', ['dc-loader'])
    .factory('Admin', function ($http, $q, $cacheFactory) {
        var errorStrings = {
            misProjId: 'Missing project id',
            misBlogId: 'Missing blog id',
            typeError: 'Wrong parameter type'
        };

        var localCache = $cacheFactory('admin');

        function checkLocalCache(key) {
            var data = localCache.get(key);
            return (data) ? { status: 200, data: data } : false;
        }

        function storeCache(key, data) {
            if (!angular.isDefined(data)) return;

            if (angular.isArray(data)) {
                var i = 0, len = data.length;
                for (; i < len; i++) {
                    storeCache(key, data[i]);
                }
            } else if (angular.isObject(data)) {
                localCache.put(type + data.id, data);
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

                return $q.when(checkLocalCache('blog.' + id) || $http.get('/api/blog', {params: {id: id}})
                    .then(function (blog) {
                        storeCache('blog.', blog.data);
                        return $q.when(blog);
                    }));
            },
            /**
             * Loads all blogs
             * @returns {Object} promise
             */
            loadAllBlogs: function () {
                return $http.get('/api/blogs')
                    .then(function (blogs) {
                        storeCache('blog.', blogs.data);
                        return $q.when(blogs);
                    });
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
                return $http.get('/api/projects')
                    .then(function (projects) {
                        storeCache('project.', projects.data);
                        return $q.when(projects);
                    });
            },
            /**
             * Loads project with specific id
             * @param {String} id
             * @returns {Object} $http promise
             */
            loadProject: function (id) {
                if (!angular.isDefined(id)) throw new Error(errorStrings.misProjId);

                return $q.when(checkLocalCache('project.' + id) || $http.get('/api/project', {params: {id: id}})
                    .then(function (project) {
                        storeCache('project.', project.data);
                        return $q.when(project);
                    }));

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
                return $http.post('/api/project/delete', { id: id });
            }
        };
    });