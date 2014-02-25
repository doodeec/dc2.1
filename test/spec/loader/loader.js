'use strict';

describe('Loader:: Loader', function () {

    beforeEach(module('dc-loader'));


    var LoaderService,
        $httpBackend,
        $timeout;

    beforeEach(inject(function ($injector) {
        LoaderService = $injector.get('LoaderService');
        $httpBackend = $injector.get('$httpBackend');
        $timeout = $injector.get('$timeout');
    }));

    it('should have 0 tasks registered', function () {
        expect(LoaderService.activeLoader()).toBe(false);
    });

    it('should register a defered task', function () {
        LoaderService.register('first-id');
        expect(LoaderService.activeLoader()).toBe(false);

        $timeout(function () {
            expect(LoaderService.activeLoader()).toBe(true);
        }, 500);
    });

    it('should unregister a task', function () {
        LoaderService.register('first-id');
        expect(LoaderService.activeLoader()).toBe(false);

        $timeout(function () {
            LoaderService.unregister('first-id');
            expect(LoaderService.activeLoader()).toBe(false);
        }, 200);

        $timeout(function () {
            expect(LoaderService.activeLoader()).toBe(false);
        }, 500);
    });
});
