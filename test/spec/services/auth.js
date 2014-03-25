'use strict';

describe('Service:: Auth', function () {

    beforeEach(module('dc21App'));

    var AuthService,
        $httpBackend;

    beforeEach(inject(function ($injector) {
        AuthService = $injector.get('Auth');
        $httpBackend = $injector.get('$httpBackend');
    }));

    it('should have all methods defined', function () {
        expect(AuthService.login).toBeDefined();
        expect(AuthService.logout).toBeDefined();
        expect(AuthService.changePassword).toBeDefined();
        expect(AuthService.currentUser).toBeDefined();
        expect(AuthService.isLoggedIn).toBeDefined();
    });

    it('should send login post request', function () {
        $httpBackend.expectPOST('/api/session')
            .respond({name: 'testuser', email: 'test@test.test'});

        var user = {
            email: 'test@e.mail',
            password: 'newpassword'
        };
        AuthService.login(user).then(function (loggedUser) {
            expect(loggedUser.name).toBe('testuser');
            expect(loggedUser.email).toBe('test@test.test');
        });

        $httpBackend.flush();
    });

    it('should send delete session request', function () {
        $httpBackend.expectDELETE('/api/session')
            .respond(200);

        AuthService.logout();
        $httpBackend.flush();
    });
});
