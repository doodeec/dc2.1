'use strict';

describe('Cache:: CacheService', function () {

    beforeEach(module('dc-cache'));

    var $cacheFactory,
        CacheService;

    beforeEach(inject(function ($injector) {
        $cacheFactory = $injector.get('$cacheFactory');
        CacheService = $injector.get('CacheService');
    }));

    it('should have all methods defined', function () {
        expect(CacheService.get).toBeDefined();
    });

    it('should create local cache', function () {
        var cache = CacheService.get('project');
        expect(cache).toBeDefined();
    });

    it('should get the saved data', function () {
        var cache = CacheService.get('project');
        cache.save('project.', { id: 2, data: 'Project 2' });
        expect(cache.load('project.2')).toBeDefined();
        expect(typeof cache.load('project.2')).toBe('object');
        expect(cache.load('project.2').status).toBe(200);
    });

    it('should not get the saved data', function () {
        var cache = CacheService.get('project');
        cache.save('project.', { id: 2, data: 'Project 2' });
        expect(cache.load('project.3')).toBe(false);
    });

    it('should get the same cache object', function () {
        var cache = CacheService.get('project');
        cache.save('project.', { id: 2, data: 'Project 2' });

        var newCache = CacheService.get('project');
        expect(newCache.load('project.2')).toBeDefined();
        expect(typeof newCache.load('project.2')).toBe('object');
        expect(newCache.load('project.2').status).toBe(200);
    });
});
