'use strict';

angular.module('dc-socket', [])
    .factory('Socket', function ($window) {
        var on = angular.noop,
            emit = angular.noop,
            removeListener = angular.noop;

        if (angular.isDefined($window.io)) {
            var socket = $window.io.connect();

            on = socket.on;
            emit = socket.emit;
            removeListener = function () {
                return socket.removeListener.apply(socket, arguments);
            };
        }

        return {
            on: on,
            emit: emit,
            removeListener: removeListener
        }
    });