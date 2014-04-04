'use strict';

angular.module('dc-widgets')
    .directive('dcWidget', function ($compile) {

        return {
            restrict: 'EA',
            replace: true,
            scope: {
                wgt: "="
            },
            link: function (scope, elem, attrs) {
                var template = '<' + scope.wgt.widgetType + '-wgt></' + scope.wgt.widgetType + '-wgt>';

                elem.html($compile(template)(scope));
            }
        }
    });