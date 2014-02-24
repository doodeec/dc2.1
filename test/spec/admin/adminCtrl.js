'use strict';

describe('Admin:: AdminCtrl', function () {

    beforeEach(module('dc21App'));
    beforeEach(module('dc-admin'));

    var AdminCtrl,
        AdminService,
        scope,
        $httpBackend;

    beforeEach(inject(function (_$httpBackend_, _Admin_, _Auth_, _$route_, $controller, $rootScope) {
        $httpBackend = _$httpBackend_;
        AdminService = _Admin_;

        $httpBackend.expectGET('/api/users/me')
            .respond({name: 'Admin'});

        $httpBackend.expectGET('/api/blogs')
            .respond([
                {id: 1, title: 'Blog 1'},
                {id: 5, title: 'Blog 5'}
            ]);

        //TODO check why is this necessary
        $httpBackend.expectGET('partials/main')
            .respond(200);

        scope = $rootScope.$new();
        AdminCtrl = $controller('AdminCtrl', {
            $scope: scope,
            $route: _$route_,
            Auth: _Auth_,
            AdminService: AdminService
        });
    }));

    it('should have current user defined', function () {
        expect(scope.user.name).toBeUndefined();
        $httpBackend.flush();
        expect(scope.user).toBeDefined();
        expect(scope.user.name).toBe('Admin');
    });

    it('should load 2 blogs', function () {
        expect(scope.blogs.length).toBe(0);
        $httpBackend.flush();
        expect(scope.blogs).toBeDefined();
        expect(scope.blogs.length).toBe(2);
    });
});