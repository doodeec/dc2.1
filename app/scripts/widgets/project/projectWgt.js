'use strict';

angular.module(window.ngAppName)
    .run(function (Widget) {
        Widget.registerType('project');
    })
    .directive('projectWgt', function () {
        return {
            template: '<div>blog widget</div>',
            link: function (scope, elem, attrs) {

            }
        }
    });