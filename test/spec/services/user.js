'use strict';

describe('Service:: User', function () {

    beforeEach(module('dc21App'));

    var UserService,
        $httpBackend;

    beforeEach(inject(function ($injector) {
        UserService = $injector.get('User');
        $httpBackend = $injector.get('$httpBackend');
    }));

    it('should have all methods defined', function () {
        expect(UserService.get).toBeDefined();
        expect(UserService.update).toBeDefined();
    });

    it('should return current user', function () {
        $httpBackend.expectGET('/api/users/me')
            .respond({name: 'testuser', email: 'test@test.test'});

        var user = UserService.get();
        $httpBackend.flush();

        expect(user.name).toBe('testuser');
        expect(user.email).toBe('test@test.test');
    });

    it('should send put request', function () {
        $httpBackend.expectPUT('/api/users')
            .respond({name: 'testuser', email: 'test@test.test'});

        UserService.update();
        $httpBackend.flush();
    });
});
