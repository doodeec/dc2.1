'use strict';

angular.module('dc-blog')
    .controller('BlogCtrl', function ($scope, $location, $routeParams, BlogService) {
        function reloadBlog(id) {
            BlogService.loadBlog(id).then(function (blog) {
                $scope.blog = blog.data;
            });
        }

        $scope.blog = null;
        //TODO loader service
        $scope.loading = null;

        $scope.$watch(function () {
            return $routeParams.id;
        }, function (val, oldVal) {
            if (val) reloadBlog(val);
        });
    });