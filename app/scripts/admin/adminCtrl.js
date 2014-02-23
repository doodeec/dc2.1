'use strict';

angular.module('dc-admin')
    .controller('AdminCtrl', function ($scope, $route, Auth, Admin) {
        $scope.user = Auth.currentUser();
        $scope.text = 'This is admin section';
        $scope.blogs = [];

        $scope.logout = function () {
            Auth.logout().then($route.reload);
        };

        Admin.loadAllBlogs().then(function (blogs) {
            $scope.blogs = blogs.data;
        });
    });