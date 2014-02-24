'use strict';

angular.module('dc21App')
    .controller('MainCtrl', function ($scope, $rootScope, BlogService) {
        BlogService.loadBlogs().then(function (blogArticles) {
            $scope.blogArticles = blogArticles.data;
        });

        BlogService.loadAllBlogs().then(function (blogArticles) {
            $scope.allBlogs = blogArticles.data;
        });
    });
