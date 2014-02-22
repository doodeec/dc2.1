'use strict';

angular.module('dc21App')
    .factory('Session', function ($resource) {
        return $resource('/api/session/');
    });
