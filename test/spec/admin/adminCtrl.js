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

    it('should validate blog', function () {
        scope.newBlog = { id: 123, title: 'Title 123', content: [
            { text: 'Abcd' }
        ] };
        expect(scope.validBlog()).toBe(true);

        scope.newBlog = { id: 123, title: 'Title 123', shortDesc: 'short desc' };
        expect(scope.validBlog()).toBe(true);

        $httpBackend.flush();
    });

    it('should not validate blog', function () {
        scope.newBlog = { id: 123, title: 'Title 123', content: [
            { text: null }
        ] };
        expect(scope.validBlog()).toBe(false);

        scope.newBlog = { id: 123, title: null, content: [
            { text: 'Abcd' }
        ] };
        expect(scope.validBlog()).toBe(false);

        scope.newBlog = { id: null, title: 'Title 123', content: [
            { text: 'Abcd' }
        ] };
        expect(scope.validBlog()).toBe(false);

        $httpBackend.flush();
    });

    it('should validate content', function () {
        scope.newBlog = { content: [
            { text: 'Text 1' }
        ] };
        expect(scope.validContent()).toBe(true);

        scope.newBlog = { content: [
            { text: 'Text 1' },
            { text: 'Text 2' }
        ] };
        expect(scope.validContent()).toBe(true);

        scope.newBlog = { content: [
            { text: 'Text 1' },
            { text: 'Text 2' },
            { text: 'Text 3' }
        ] };
        expect(scope.validContent()).toBe(true);

        $httpBackend.flush();
    });

    it('should not validate content', function () {
        scope.newBlog = { content: [
            { text: null }
        ] };
        expect(scope.validContent()).toBe(false);

        scope.newBlog = { content: [
            { text: null },
            { text: 'Text 2' }
        ] };
        expect(scope.validContent()).toBe(false);

        scope.newBlog = { content: [
            { text: 'Text 1' },
            { text: null },
            { text: 'Text 3' }
        ] };
        expect(scope.validContent()).toBe(false);

        $httpBackend.flush();
    });

    it('should add sections', function () {
        expect(scope.newBlog.content.length).toBe(1);
        scope.addSection();
        expect(scope.newBlog.content.length).toBe(2);
        scope.addSection();
        expect(scope.newBlog.content.length).toBe(3);

        $httpBackend.flush();
    });
});