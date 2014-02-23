'use strict';

angular.module('dc21App')
    .controller('NavbarCtrl', function ($scope, $location, Auth) {
        $scope.menu = [
            {
                'title': 'Home',
                'link': '/'
            },
            {
                'title': 'Blog',
                'link': '/blog'
            },
            {
                'title': 'Projects',
                'link': '/projects'
            },
            {
                'title': 'Contact',
                'link': '/contact'
            }
        ];

        $scope.isActive = function (route) {
            return route === $location.path();
        };
    });
