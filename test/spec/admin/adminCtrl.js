'use strict';

describe('Admin:: AdminCtrl', function () {

    beforeEach(module('dc21App'));
    beforeEach(module('dc-admin'));

    var AdminCtrl,
        AdminService,
        scope,
        $httpBackend;

    function expectReload() {
        $httpBackend.expectGET('/api/blogs')
            .respond([
                {id: 1, title: 'Blog 1'},
                {id: 5, title: 'Blog 5'}
            ]);
    }

    beforeEach(inject(function ($injector) {
        var Auth = $injector.get('Auth'),
            $route = $injector.get('$route'),
            $controller = $injector.get('$controller'),
            $rootScope = $injector.get('$rootScope');

        $httpBackend = $injector.get('$httpBackend');
        AdminService = $injector.get('Admin');

        Auth.login({
            email: 'admin@doodeec.com',
            password: 'test'
        });

        $httpBackend.expectPOST('/api/session')
            .respond(200);

        $httpBackend.expectGET('/api/users/me')
            .respond({name: 'Admin'});

        expectReload();

        //TODO why is this firing?
        $httpBackend.expectGET('partials/main')
            .respond(200);

        scope = $rootScope.$new();
        AdminCtrl = $controller('AdminCtrl', {
            $scope: scope,
            $route: $route,
            Auth: Auth,
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

    it('should clear blog form and turn off edit mode', function () {
        $httpBackend.flush();
        scope.editMode = true;
        scope.newBlog = { id: 2 };
        scope.closeEditMode();
        expect(scope.editMode).toBe(false);
        expect(scope.newBlog.id).toBeUndefined();
    });

    it('should add sections', function () {
        expect(scope.newBlog.content.length).toBe(1);
        scope.addSection();
        expect(scope.newBlog.content.length).toBe(2);
        scope.addSection();
        expect(scope.newBlog.content.length).toBe(3);

        $httpBackend.flush();
    });

    it('should send create blog request', function () {
        $httpBackend.flush();
        $httpBackend.expectPOST('/api/blog/create')
            .respond(200);
        expectReload();

        scope.newBlog = { id: 123, title: 'Title 123', content: [
            { text: 'Abcd' }
        ] };
        scope.saveBlog();
        $httpBackend.flush();
    });

    it('should send edit blog request', function () {
        $httpBackend.flush();
        $httpBackend.expectPOST('/api/blog/save')
            .respond(200);
        expectReload();

        scope.editMode = true;
        scope.newBlog = { id: 123, title: 'Title 123', content: [
            { text: 'Abcd' }
        ] };
        scope.saveBlog();
        $httpBackend.flush();
    });

    it('should not any request', function () {
        $httpBackend.flush();

        scope.newBlog = { id: 123, title: 'Title 123' };
        scope.saveBlog();

        scope.editMode = true;
        scope.newBlog = { id: 123, title: 'Title 123' };
        scope.saveBlog();
    });

    it('should send request blog', function () {
        $httpBackend.flush();
        $httpBackend.expectGET('/api/blog?id=2')
            .respond({ id: 2 });

        scope.editBlog(2);
        $httpBackend.flush();
    });

    it('should send delete blog request', function () {
        $httpBackend.flush();
        $httpBackend.expectPOST('/api/blog/delete')
            .respond(200);
        expectReload();

        scope.deleteBlog(2);
        $httpBackend.flush();
    });
});