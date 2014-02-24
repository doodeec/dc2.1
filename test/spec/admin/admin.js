'use strict';

describe('Admin:: Admin', function () {

    beforeEach(module('dc-admin'));


    var AdminService,
        $httpBackend;

    beforeEach(inject(function (_$httpBackend_, _Admin_) {
        AdminService = _Admin_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.flush();
    });

    describe('method:: loadBlog', function () {
        beforeEach(function () {
            $httpBackend.expectGET('/api/blog?id=12')
                .respond({id: 12, title: 'Blog 12'});
        });

        it('should load blog with id 12', function () {
            AdminService.loadBlog(12).then(function (response) {
                expect(response.data).toBeDefined();
                expect(response.data.id).toBe(12);
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
            AdminService.loadAllBlogs().then(function (response) {
                expect(response.data).toBeDefined();
                expect(response.data.length).toBe(3);
            });
        });
    });

    describe('method:: createBlog', function () {
        beforeEach(function () {
            $httpBackend.expectPOST('/api/blog/create')
                .respond(200);

            $httpBackend.expectGET('/api/blog?id=12')
                .respond({id: 12, title: 'Test Blog 12'});
        });

        it('should create a new blog', function () {
            var params = { id: 12, title: 'Test Blog 12' };

            AdminService.createBlog(params).then(function () {
                AdminService.loadBlog(12).then(function (response) {
                    expect(response.data).toBeDefined();
                    expect(response.data.id).toBe(12);
                    expect(response.data.title).toBe('Test Blog 12');
                });
            });
        });
    });
});
