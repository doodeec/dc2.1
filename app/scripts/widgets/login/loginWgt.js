'use strict';

angular.module(window.ngAppName)
    .run(function (Widget) {
        Widget.registerType('login');
    })
    .directive('loginWgt', function () {
        return {
            restrict: 'EA',
            template: '<div>login widget</div>',
            link: function (scope, elem, attrs) {

            }
        }
    });