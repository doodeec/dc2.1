'use strict';

angular.module('dc21App')
    .controller('LoginCtrl', function ($scope, Auth, $location) {
        $scope.user = {};
        $scope.errors = {};

        $scope.login = function (form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.login({
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                    .then(function () {
                        // Logged in, redirect to admin
                        $location.path('/admin');
                    })
                    .catch(function (err) {
                        err = err.data;
                        $scope.errors.other = err.message;
                    });
            }
        };
    });