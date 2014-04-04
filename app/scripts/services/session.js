'use strict';

angular.module(window.ngAppName)
    .factory('Session', function ($resource) {
        return $resource('/api/session/');
    });
