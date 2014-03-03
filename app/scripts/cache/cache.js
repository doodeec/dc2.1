'use strict';

angular.module('dc-cache', [])
    .factory('CacheService', function ($cacheFactory) {
        /**
         * Cache class
         * @param {String} id
         * @constructor
         */
        function Cache(id) {
            this.id = id;
            this.cache = $cacheFactory.get(id) || $cacheFactory(id);
        }

        /**
         * Saving array/object
         * @param {String} identifier
         * @param {Array/Object}data
         */
        Cache.prototype.save = function (identifier, data) {
            if (angular.isArray(data)) {
                var i = 0, len = data.length;
                for (; i < len; i++) {
                    this.save(identifier, data[i]);
                }
            } else if (angular.isObject(data)) {
                this.cache.put(identifier + data.id, data);
            }
        };

        /**
         * Load cached object
         * @param {String} identifier
         * @returns {{status: number, data: *}}
         */
        Cache.prototype.load = function (identifier) {
            var data = this.cache.get(identifier);
            return (data) ? { status: 200, data: data } : false;
        };

        return {
            get: function (id) {
                return new Cache(id);
            }
        };
    });