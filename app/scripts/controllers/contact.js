'use strict';

angular.module('dc21App')
    .controller('ContactCtrl', function ($scope, $timeout) {
        var delay = 200;
        var social = ['linkedin', 'facebook', 'twitter', 'github', 'mail']

        $scope.social = {
            facebook: false,
            twitter: false,
            mail: false,
            github: false,
            linkedin: false
        };

        var kickoffAnim = function (i) {
            $timeout(function () {
                $scope.social[social[i]] = true;
                if (social[i + 1]) kickoffAnim(i + 1);
            }, delay);
        };

        kickoffAnim(0);
    });