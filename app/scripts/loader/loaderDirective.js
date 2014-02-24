'use strict';

angular.module('dc-loader')
    .directive('dcLoader', function () {
        return {
            restrict: 'EA',
            replace: true,
            template: '<div class="dc-loader" ng-class="{shown: activeLoader()}">Loading...</div>'
        }
    });