'use strict';

angular.module('dc-admin')
    .controller('AdminCtrl', function ($scope, $route, Auth) {
        $scope.user = Auth.currentUser();
        $scope.text = 'This is admin section';

        $scope.logout = function () {
            Auth.logout()
                .then(function () {
                    $route.reload();
                });
        };
    });