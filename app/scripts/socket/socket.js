'use strict';

angular.module('dc-socket', [])
    .factory('Socket', function ($window) {
        if (angular.isUndefined($window.io)) {
            return {
                on: angular.noop,
                emit: angular.noop,
                removeListener: angular.noop
            }
        }

        var socket = $window.io.connect();

        return {
            on: function (event, callback) {
                socket.on(event, callback);
            },
            emit: function (event, data) {
                return socket.emit(event, data);
            },
            removeListener: function () {
                return socket.removeListener.apply(socket, arguments);
            }
        }
    });