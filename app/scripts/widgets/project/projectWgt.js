'use strict';

angular.module(window.ngAppName)
    .run(function (Widget) {
        Widget.registerType('project');
    })
    .directive('projectWgt', function () {
        return {
            restrict: 'EA',
            template: '<div>project widget</div>',
            link: function (scope, elem, attrs) {

            }
        }
    });