'use strict';

angular.module('dc-admin')
    .controller('AdminCtrl', function ($scope, $route, Auth, Admin) {

        $scope.user = Auth.currentUser();
        $scope.text = 'This is admin section';
        $scope.newBlog = {};
        $scope.blogs = [];

        $scope.newBlog.content = [
            {
                header: null,
                text: null
            }
        ];

        /**
         * Reloads Blog list
         */
        function reload() {
            Admin.loadAllBlogs().then(function (blogs) {
                $scope.blogs = blogs.data;
            });
        }

        $scope.logout = function () {
            Auth.logout().then($route.reload);
        };

        $scope.createBlog = function () {
            console.log($scope.newBlog);
            // TODO validate - error when empty fields
            if (!angular.isDefined($scope.newBlog.id)) return;
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