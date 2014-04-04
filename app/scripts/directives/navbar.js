'use strict';

angular.module(window.ngAppName)
    .directive('dcNavbar', function ($location) {
        return {
            restrict: 'EA',
            template: '<div class="header">' +
                '<ul class="nav pull-right">' +
                '<li ng-repeat="item in menu" ng-class="{active: isActive(item.link)}">' +
                '<a ng-href="{{item.link}}">{{item.title}}</a>' +
                '</li>' +
                '</ul>' +
                '<h3>DC<small>2.1</small></h3>' +
                '</div>',
            link: function (scope, elem, attrs) {
                scope.menu = [
                    { 'title': 'Home', 'link': '/' },
                    { 'title': 'Blog', 'link': '/blog' },
                    { 'title': 'Projects', 'link': '/projects' },
                    { 'title': 'Contact', 'link': '/contact' }
                ];

                scope.isActive = function (route) {
                    return route === $location.path();
                };
            }
        }
    });
