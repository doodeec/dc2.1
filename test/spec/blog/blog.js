'use strict';

describe('Blog:: BlogService', function () {

    beforeEach(module('dc-blog'));

    var BlogService,
        $httpBackend;

    beforeEach(inject(function ($injector) {
        BlogService = $injector.get('BlogService');
        $httpBackend = $injector.get('$httpBackend');
    }));

    it('should have all methods defined', function () {
        expect(BlogService.loadBlog).toBeDefined();
        expect(BlogService.loadBlogs).toBeDefined();
        expect(BlogService.loadAllBlogs).toBeDefined();
    });

    describe('BlogService:: methods', function () {
        afterEach(function () {
            $httpBackend.flush();
        });

        describe('method:: loadBlog', function () {
            beforeEach(function () {
                $httpBackend.expectGET('/api/blog?id=5')
                    .respond({id: 5, title: 'Blog 5'});
            });

            it('should load specific blog with id 5', function () {
                BlogService.loadBlog(5).then(function (response) {
                    expect(response.data).toBeDefined();
                    expect(response.data.id).toBe(5);
                });
            });
        });

        describe('method:: loadBlogs', function () {
            beforeEach(function () {
                $httpBackend.expectGET('/api/blogs/home')
                    .respond([
                        {id: 1, title: 'Blog 1'},
                        {id: 2, title: 'Blog 5'}
                    ]);
            });

            it('should load 2 blogs', function () {
                BlogService.loadBlogs().then(function (response) {
                    expect(response.data).toBeDefined();
                    expect(response.data.length).toBe(2);
                });
            });
        });

        describe('method:: loadAllBlogs', function () {
            beforeEach(function () {
                $httpBackend.expectGET('/api/blogs')
                    .respond([
                        {id: 1, title: 'Blog 1'},
                        {id: 2, title: 'Blog 2'},
                        {id: 2, title: 'Blog 5'}
                    ]);
            });

            it('should load 3 blogs', function () {
                BlogService.loadAllBlogs().then(function (response) {
                    expect(response.data).toBeDefined();
                    expect(response.data.length).toBe(3);
                });
            });
        });
    });
});
