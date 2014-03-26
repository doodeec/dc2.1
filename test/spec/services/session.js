'use strict';

describe('Service:: Session', function () {

    beforeEach(module('dc21App'));

    var SessionService,
        $httpBackend;

    beforeEach(inject(function ($injector) {
        SessionService = $injector.get('Session');
        $httpBackend = $injector.get('$httpBackend');
    }));

    it('should have all methods defined', function () {
        expect(SessionService.save).toBeDefined();
        expect(SessionService.delete).toBeDefined();
    });

    it('should send post request', function () {
        $httpBackend.expectPOST('/api/session')
            .respond({name: 'testuser'});

        SessionService.save({name: 'testuser', email: 'test@test.test'});
        $httpBackend.flush();
    });

    it('should send delete request', function () {
        $httpBackend.expectDELETE('/api/session')
            .respond(200);

        SessionService.delete();
        $httpBackend.flush();
    });
});
