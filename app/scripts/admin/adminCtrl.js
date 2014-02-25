'use strict';

angular.module('dc-admin')
    .controller('AdminCtrl', function ($scope, $route, Auth, Admin) {

        var emptySection = { header: null, text: null };

        $scope.user = Auth.currentUser();
        $scope.text = 'This is admin section';
        $scope.newBlog = {};
        $scope.newProj = {};
        $scope.blogs = [];
        $scope.mode = null;

        $scope.newBlog.content = [angular.copy(emptySection)];

        /**
         * Reloads Blog list
         */
        function reload() {
            Admin.loadAllBlogs().then(function (blogs) {
                $scope.blogs = blogs.data;
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

        $scope.validBlog = validBlog;
        $scope.validContent = validContent;

        $scope.addSection = function () {
            $scope.newBlog.content.push(angular.copy(emptySection));
        };

        /**
         * Log out and reload route to redirect to login
         */
        $scope.logout = function () {
            Auth.logout().then($route.reload);
        };

        /**
         * Create new blog
         */
        $scope.createBlog = function () {
            console.log($scope.newBlog);
            if (!validBlog()) return;
            $scope.newBlog.allowedHome = Boolean($scope.newBlog.allowedHome);
            Admin.createBlog($scope.newBlog).then(reload);
        };

        $scope.editBlog = function (id) {
            if (!angular.isDefined(id)) return;

            Admin.editBlog({
                id: id,
                date: new Date()
            }).then(function () {
                    console.log('updated');
                    reload();
                });
        };

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