'use strict';

angular.module('dc21App')
    .controller('MainCtrl', function ($scope, $http) {
        $http.get('/api/blog').success(function (blogArticles) {
            $scope.blogArticles = blogArticles;
        });
    });
