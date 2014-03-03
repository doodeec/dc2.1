'use strict';

angular.module('dc-socket', [])
    .factory('Socket', function () {
        if (angular.isUndefined(io)) {
            return {
                on: angular.noop,
                emit: angular.noop,
                removeListener: angular.noop
            }
        }

        var socket = io.connect();

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