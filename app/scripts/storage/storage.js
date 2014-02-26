'use strict';

angular.module('dc-storage', [])
    .factory('Storage', function () {
        var GLOBALSTORAGEKEY = 'dc21.';
        var storage = localStorage || window.localStorage;

        // check if localStorage is supported
        if (angular.isUndefined(storage)) {
            return {
                save: angular.noop,
                load: function () {
                    return false
                }
            }
        }

        function loadStorage(type) {
            var data = storage.getItem(GLOBALSTORAGEKEY + type);
            if (data) data = JSON.parse(data);
            return data;
        }

        function saveStorage(type, data) {
            storage.setItem(GLOBALSTORAGEKEY + type, JSON.stringify(data));
        }

        return {
            /**
             * Saves data to localstorage
             * @param {String} type
             * @param {String} key
             * @param {*} data
             */
            save: function (type, key, data) {
                if (angular.isUndefined(key)) return;
                var storageData = loadStorage(type);

                storageData[key] = data;

                saveStorage(storageData);
            },
            /**
             * Returns data from localstorage
             * @param {String} type
             * @param {String} key
             * @returns {*} key value or 'false'
             */
            load: function (type, key) {
                if (angular.isUndefined(key)) return false;
                var typeStorage = loadStorage(type);

                return (key in typeStorage) ? typeStorage[key] : false;
            }
        }
    });