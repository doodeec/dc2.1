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
                scope.blog = scope.dcBlogArticle;
            }
        };
    });