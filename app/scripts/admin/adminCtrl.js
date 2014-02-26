'use strict';

angular.module('dc-admin')
    .controller('AdminCtrl', function ($scope, $route, $timeout, Auth, Admin, LoaderService) {
        var emptySection = { header: null, text: null };

        $scope.user = Auth.currentUser();
        $scope.text = 'This is admin section';
        $scope.blogs = [];
        $scope.projects = [];
        $scope.mode = null;
        $scope.editMode = false;

        /**
         * Clears blog form
         */
        function clearBlog() {
            $scope.newBlog = {};
            $scope.newBlog.content = [angular.copy(emptySection)];
        }

        /**
         * Clears project form
         */
        function clearProject() {
            $scope.newProj = {};
        }

        /**
         * Reloads Blog list
         */
        function reloadBlogs() {
            $scope.loadingBlogs = true;
            Admin.loadAllBlogs().then(function (blogs) {
                $scope.blogs = blogs.data;
                $scope.editMode = false;
                clearBlog();
                $scope.loadingBlogs = false;
            }, function () {
                $scope.loadingBlogs = false;
            });
        }

        /**
         * Reloads Project list
         */
        function reloadProjects() {
            $scope.loadingProjects = true;
            Admin.loadAllProjects().then(function (projects) {
                $scope.projects = projects.data;
                $scope.editMode = false;
                clearProject();
                $scope.loadingProjects = false;
            }, function () {
                $scope.loadingProjects = false;
            });
        }

        /**
         * Checks if blog has id, title and any content
         */
        function validBlog() {
            return Boolean(validContent() && $scope.newBlog.id && $scope.newBlog.title &&
                ($scope.newBlog.content && $scope.newBlog.content.length || $scope.newBlog.shortDesc)
            );
        }

        /**
         * Checks if project has id, title and any content
         */
        function validProject() {
            return Boolean($scope.newProj.id && $scope.newProj.title &&
                ($scope.newProj.shortDesc || $scope.newProj.description)
            );
        }

        /**
         * Checks $scope.newBlog.content for validity
         */
        function validContent() {
            if (!angular.isDefined($scope.newBlog.content)) return true;

            var i = 0, len = $scope.newBlog.content.length, valid = true;
            for (; i < len; i++) {
                if (!$scope.newBlog.content[i].text) {
                    valid = false;
                    break;
                }
            }
            return valid;
        }

        /**
         * Changing tabs (creating blog/project)
         */
        function changeTab(mode) {
            if ($scope.mode === mode) return;
            if ($scope.mode) {
                $scope.mode = null;
                $timeout(function () {
                    $scope.mode = mode;
                }, 300);
            } else {
                $scope.mode = mode;
            }
        }

        /**
         * Create new blog
         */
        function createBlog() {
            console.log($scope.newBlog);
            if (!validBlog()) return;
            $scope.newBlog.allowedHome = Boolean($scope.newBlog.allowedHome);
            Admin.createBlog($scope.newBlog).then(reloadBlogs);
        }

        /**
         * Update blog
         */
        function updateBlog() {
            console.log($scope.newBlog);
            if (!validBlog()) return;
            $scope.newBlog.allowedHome = Boolean($scope.newBlog.allowedHome);
            Admin.editBlog($scope.newBlog).then(reloadBlogs);
        }

        $scope.validBlog = validBlog;
        $scope.validContent = validContent;
        $scope.validProject = validProject;
        $scope.changeTab = changeTab;

        /**
         * Closing edit mode, clears blog form
         */
        $scope.closeEditMode = function () {
            $scope.editMode = false;
            if ($scope.mode === 'project') {
                clearProject();
            } else if ($scope.mode === 'blog') {
                clearBlog();
            }
            $scope.mode = null;
        };

        /**
         * Add section to edit form
         */
        $scope.addSection = function () {
            $scope.newBlog.content.push(angular.copy(emptySection));
        };

        /**
         * Log out and reload route to redirect to login
         */
        $scope.logout = function () {
            Auth.logout().then($route.reload);
        };

        $scope.saveBlog = function () {
            $scope.editMode ? updateBlog() : createBlog();
        };

        /**
         * Edit existing blog
         */
        $scope.editBlog = function (id) {
            if (!angular.isDefined(id)) return;

            LoaderService.register('loading-blog', 0);
            Admin.loadBlog(id).then(function (blog) {
                changeTab('blog');
                $scope.editMode = true;
                $scope.newBlog = blog.data;

                LoaderService.unregister('loading-blog');
                if ($scope.newBlog['_id']) delete $scope.newBlog['_id'];
                if ($scope.newBlog['_v']) delete $scope.newBlog['_v'];
            });
        };

        /**
         * Delete existing blog
         */
        $scope.deleteBlog = function (id) {
            if (!angular.isDefined(id)) return;

            Admin.deleteBlog(id).then(reloadBlogs);
        };

        /**
         * Create new project
         */
        $scope.createProject = function () {
            console.log($scope.newProj);
            if (!validProject()) return;
            Admin.createProject($scope.newProj).then(reloadBlogs);
        };

        /**
         * Copy project into project form, turn on edit mode
         */
        $scope.editProject = function (id) {
            if (!angular.isDefined(id)) return;

            LoaderService.register('loading-project', 0);
            Admin.loadProject(id).then(function (project) {
                changeTab('project');
                $scope.editMode = true;
                $scope.newProj = project.data;

                LoaderService.unregister('loading-project');
                if ($scope.newProj['_id']) delete $scope.newProj['_id'];
                if ($scope.newProj['_v']) delete $scope.newProj['_v'];
            });
        };

        $scope.deleteProject = function (id) {
            if (!angular.isDefined(id)) return;

            Admin.deleteProject(id).then(reloadBlogs);
        };

        clearBlog();
        clearProject();

        reloadBlogs();
        reloadProjects();
    });