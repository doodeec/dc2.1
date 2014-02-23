'use strict';

angular.module('dc-blog')
    .controller('BlogCtrl', function ($scope, $routeParams, BlogService) {
        function reloadBlog(id) {
            BlogService.loadBlog(id).then(function (blog) {
                var date = new Date(blog.data.date);
                $scope.blog = blog.data;
                $scope.date = date.getDate() + '. ' + (date.getMonth() + 1) + '. ' + date.getFullYear();
            });
        }

        $scope.date = null;
        $scope.blog = null;
        //TODO loader service
        $scope.loading = null;

        $scope.$watch(function () {
            return $routeParams.id;
        }, function (val, oldVal) {
            if (val) reloadBlog(val);
        });
    });