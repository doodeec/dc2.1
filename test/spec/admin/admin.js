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

    it('should have all methods defined', function () {
        expect(AdminService.loadBlog).toBeDefined();
        expect(AdminService.loadAllBlogs).toBeDefined();
        expect(AdminService.createBlog).toBeDefined();
        expect(AdminService.editBlog).toBeDefined();
        expect(AdminService.deleteBlog).toBeDefined();
        expect(AdminService.publishBlog).toBeDefined();
        expect(AdminService.createProject).toBeDefined();
        expect(AdminService.editProject).toBeDefined();

        //TODO $http flush not needed
    });

    describe('method:: loadBlog', function () {
        beforeEach(function () {
            $httpBackend.expectGET('/api/blog?id=12')
                .respond({ id: 12 });
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
                    { id: 1 },
                    { id: 2 },
                    { id: 5 }
                ]);
        });

        it('should load an array of all blogs', function () {
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
        });

        it('should send a post request to /api/blog/create', function () {
            var params = { id: 12 };

            AdminService.createBlog(params).then(function (response) {
                expect(response).toBeDefined();
                expect(response.status).toBe(200);
            });
        });
    });

    describe('method:: editBlog', function () {
        beforeEach(function () {
            $httpBackend.expectPOST('/api/blog/save')
                .respond(200);
        });

        it('should send a post request to /api/blog/save', function () {
            var params = { id: 12 };

            AdminService.editBlog(params).then(function (response) {
                expect(response).toBeDefined();
                expect(response.status).toBe(200);
            });
        });
    });

    describe('method:: deleteBlog', function () {
        beforeEach(function () {
            $httpBackend.expectPOST('/api/blog/delete')
                .respond(200);
        });

        it('should send a post request to /api/blog/delete', function () {
            var params = { id: 12 };

            AdminService.deleteBlog(params).then(function (response) {
                expect(response).toBeDefined();
                expect(response.status).toBe(200);
            });
        });
    });

    describe('method:: publishBlog', function () {
        beforeEach(function () {
            $httpBackend.expectPOST('/api/blog/save')
                .respond(200);
        });

        it('should send a post request to /api/blog/save', function () {
            var params = { id: 12 };

            AdminService.publishBlog(params).then(function (response) {
                expect(response).toBeDefined();
                expect(response.status).toBe(200);
            });
        });
    });

    describe('method:: createProject', function () {
        beforeEach(function () {
            $httpBackend.expectPOST('/api/project/create')
                .respond(200);
        });

        it('should send a post request to /api/project/create', function () {
            var params = { id: 12 };

            AdminService.createProject(params).then(function (response) {
                expect(response).toBeDefined();
                expect(response.status).toBe(200);
            });
        });
    });

    describe('method:: editProject', function () {
        beforeEach(function () {
            $httpBackend.expectPOST('/api/blog/save')
                .respond(200);
        });

        it('should send a post request to /api/project/save', function () {
            var params = { id: 12 };

            AdminService.editProject(params).then(function (response) {
                expect(response).toBeDefined();
                expect(response.status).toBe(200);
            });
        });
    });
});
