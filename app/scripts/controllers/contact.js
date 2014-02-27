'use strict';

angular.module('dc21App')
    .controller('ContactCtrl', function ($scope, $timeout) {
        $scope.facebook = false;
        $scope.twitter = false;

        // kick off animations
        $timeout(function () {
            $scope.facebook = true;

            $timeout(function () {
                $scope.twitter = true;
            }, 200);
        });
    });