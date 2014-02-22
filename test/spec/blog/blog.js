'use strict';

describe('Blog:: BlogService', function () {

    // load the controller's module
    beforeEach(module('dc-blog'));

    var BlogService,
        $httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$httpBackend_, _BlogService_) {
        BlogService = _BlogService_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.flush();
    });

    it('loadBlog: should load specific blog with id 5', function () {
        $httpBackend.expectGET('/api/blog?id=5')
            .respond({id: 5, title: 'Blog 5'});

        BlogService.loadBlog(5).then(function (response) {
            expect(response.data).toBeDefined();
            expect(response.data.id).toBe(5);
        });
    });

    it('loadBlogs: should load 2 blogs', function () {
        $httpBackend.expectGET('/api/blogs/home')
            .respond([
                {id: 1, title: 'Blog 1'},
                {id: 2, title: 'Blog 5'}
            ]);

        BlogService.loadBlogs().then(function (response) {
            expect(response.data).toBeDefined();
            expect(response.data.length).toBe(2);
        });
    });

    it('loadAllBlogs: should load 3 blogs', function () {
        $httpBackend.expectGET('/api/blogs')
            .respond([
                {id: 1, title: 'Blog 1'},
                {id: 2, title: 'Blog 2'},
                {id: 2, title: 'Blog 5'}
            ]);

        BlogService.loadAllBlogs().then(function (response) {
            expect(response.data).toBeDefined();
            expect(response.data.length).toBe(3);
        });
    });
});
