'use strict';

angular.module('dc-blog')
    .directive('dcBlog', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                dcBlogArticle: '='
            },
            template: '<div>' +
                '<h3>{{ blog.title }}</h3>' +
                '<small>{{ blog.date }}</small>' +
                '<p>{{ blog.shortDesc }}</p>' +
                '<div ng-repeat="p in blog.content">' +
                '<h4 ng-if="p.header">{{ p.header }}</h4>' +
                '<p>{{ p.text }}</p>' +
                '<div>{{ p.images }}</div>' +
                '</div>' +
//                '<p>{{ blog }}</p>' +
                '<hr />' +
                '</div>',
            link: function (scope, elem, attrs) {
                scope.blog = scope.dcBlogArticle;
            }
        };
    });