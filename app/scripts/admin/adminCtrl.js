'use strict';

angular.module('dc-admin')
    .controller('AdminCtrl', function ($scope, $route, $timeout, Auth, Admin) {

        var emptySection = { header: null, text: null };

        $scope.user = Auth.currentUser();
        $scope.text = 'This is admin section';
        $scope.newProj = {};
        $scope.blogs = [];
        $scope.mode = null;
        $scope.editMode = false;

        clearBlog();

        /**
         * Clears blog form
         */
        function clearBlog() {
            $scope.newBlog = {};
            $scope.newBlog.content = [angular.copy(emptySection)];
        }

        /**
         * Reloads Blog list
         */
        function reload() {
            Admin.loadAllBlogs().then(function (blogs) {
                $scope.blogs = blogs.data;
                $scope.editMode = false;
                clearBlog();
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
            return false;
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
            Admin.createBlog($scope.newBlog).then(reload);
        }

        /**
         * Update blog
         */
        function updateBlog() {
            console.log($scope.newBlog);
            if (!validBlog()) return;
            $scope.newBlog.allowedHome = Boolean($scope.newBlog.allowedHome);
            Admin.editBlog($scope.newBlog).then(reload);
        }

        $scope.validBlog = validBlog;
        $scope.validContent = validContent;
        $scope.changeTab = changeTab;

        /**
         * Closing edit mode, clears blog form
         */
        $scope.closeEditMode = function () {
            $scope.editMode = false;
            clearBlog();
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
         * Create new project
         */
        $scope.createProject = function () {
            console.log($scope.newProj);
            if (!validProject()) return;
            Admin.createProject($scope.newProj).then(reload);
        };

        /**
         * Edit existing blog
         */
        $scope.editBlog = function (id) {
            if (!angular.isDefined(id)) return;

            $scope.editMode = true;
            Admin.loadBlog(id).then(function (blog) {
                changeTab('blog');
                $scope.newBlog = blog.data;
                if ($scope.newBlog['_id']) delete $scope.newBlog['_id'];
                if ($scope.newBlog['_v']) delete $scope.newBlog['_v'];
            });
        };

        /**
         * Delete existing blog
         */
        $scope.deleteBlog = function (id) {
            if (!angular.isDefined(id)) return;

            Admin.deleteBlog(id)
                .then(function () {
                    console.log('Blog ' + id + ' deleted');
                    reload();
                });
        };

        reload();
    });