'use strict';

angular.module('dc-admin')
    .controller('AdminCtrl', function ($scope, $route, Auth, Admin) {
        // private variables

        // public variables
        $scope.user = Auth.currentUser();
        $scope.text = 'This is admin section';
        $scope.newBlog = {};
        $scope.blogs = [];

        // private methods

        // public methods
        $scope.logout = function () {
            Auth.logout().then($route.reload);
        };

        $scope.createBlog = function () {
            console.log($scope.newBlog);
            // TODO
        };

        // run
        Admin.loadAllBlogs().then(function (blogs) {
            $scope.blogs = blogs.data;
        });
    });