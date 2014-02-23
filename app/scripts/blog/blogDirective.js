'use strict';

angular.module('dc-blog')
    .directive('dcBlog', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                dcBlogArticle: '='
            },
            templateUrl: 'partials/blogDirective.html',
            link: function (scope, elem, attrs) {
                var date = new Date(scope.dcBlogArticle.date);
                scope.blog = scope.dcBlogArticle;
                scope.date = date.getDate() + '. ' + (date.getMonth() + 1) + '. ' + date.getFullYear();
            }
        };
    });