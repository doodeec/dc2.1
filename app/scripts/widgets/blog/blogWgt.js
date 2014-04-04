'use strict';

angular.module(window.ngAppName)
    .run(function (Widget) {
        Widget.registerType('blog');
    })
    .directive('blogWgt', function () {
        return {
            restrict: 'EA',
            template: '<div>blog widget</div>',
            link: function (scope, elem, attrs) {

            }
        }
    });