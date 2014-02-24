'use strict';

angular.module('dc-admin')
    .controller('AdminCtrl', function ($scope, $route, Auth, Admin) {

        var emptySection = { header: null, text: null };

        $scope.user = Auth.currentUser();
        $scope.text = 'This is admin section';
        $scope.newBlog = {};
        $scope.blogs = [];

        $scope.newBlog.content = [angular.copy(emptySection)];

        /**
         * Reloads Blog list
         */
        function reload() {
            Admin.loadAllBlogs().then(function (blogs) {
                $scope.blogs = blogs.data;
            });
        }

        function validBlog() {
            return Boolean(validContent() && $scope.newBlog.id && $scope.newBlog.title &&
                (($scope.newBlog.content.length && $scope.newBlog.content[0].text) ||
                    $scope.newBlog.shortDesc)
            );
        }

        function validContent() {
            var i = 0, len = $scope.newBlog.content.length, valid = true;
            for (; i < len; i++) {
                if (!($scope.newBlog.content[i].text)) {
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

        $scope.logout = function () {
            Auth.logout().then($route.reload);
        };

        $scope.createBlog = function () {
            console.log($scope.newBlog);
            if (!validBlog()) return;
            $scope.newBlog.allowedHome = Boolean($scope.newBlog.allowedHome);
//            Admin.createBlog($scope.newBlog).then(reload);
        };

        $scope.editBlog = function (id) {
            /*Admin.editBlog({
             id: id,
             date: new Date()
             }).then(function() {
             console.log('updated');
             });*/
        };

        // run
        reload();
    });