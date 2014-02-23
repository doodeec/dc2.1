'use strict';

angular.module('dc21App')
    .controller('NavbarCtrl', function ($scope, $location, Auth) {
        $scope.menu = [
            {
                'title': 'Home',
                'link': '/'
            },
            {
                'title': 'Settings',
                'link': '/settings'
            }
        ];

        $scope.isActive = function (route) {
            return route === $location.path();
        };
    });
