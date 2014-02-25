'use strict';

describe('Admin:: Admin', function () {

    beforeEach(module('dc-admin'));


    var AdminService,
        $httpBackend;

    beforeEach(inject(function ($injector) {
        AdminService = $injector.get('Admin');
        $httpBackend = $injector.get('$httpBackend');
    }));

    it('should have all methods defined', function () {
        expect(AdminService.loadBlog).toBeDefined();
        expect(AdminService.loadAllBlogs).toBeDefined();
        expect(AdminService.createBlog).toBeDefined();
        expect(AdminService.editBlog).toBeDefined();
        expect(AdminService.deleteBlog).toBeDefined();
        expect(AdminService.publishBlog).toBeDefined();
        expect(AdminService.unpublishBlog).toBeDefined();
        expect(AdminService.loadProject).toBeDefined();
        expect(AdminService.createProject).toBeDefined();
        expect(AdminService.editProject).toBeDefined();
        expect(AdminService.deleteProject).toBeDefined();
    });

    describe('Admin.methods', function () {
        afterEach(function () {
            $httpBackend.flush();
        });

        describe('method:: loadBlog', function () {
            beforeEach(function () {
                $httpBackend.expectGET('/api/blog?id=12')
                    .respond({ id: 12 });
            });

            it('should load one blog', function () {
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
                AdminService.deleteBlog(12).then(function (response) {
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
                AdminService.publishBlog(12).then(function (response) {
                    expect(response).toBeDefined();
                    expect(response.status).toBe(200);
                });
            });
        });

        describe('method:: unpublishBlog', function () {
            beforeEach(function () {
                $httpBackend.expectPOST('/api/blog/save')
                    .respond(200);
            });

            it('should send a post request to /api/blog/save', function () {
                AdminService.unpublishBlog(12).then(function (response) {
                    expect(response).toBeDefined();
                    expect(response.status).toBe(200);
                });
            });
        });

        describe('method:: loadProject', function () {
            beforeEach(function () {
                $httpBackend.expectGET('/api/project?id=2')
                    .respond({ id: 2 });
            });

            it('should load one project', function () {
                AdminService.loadProject(2).then(function (response) {
                    expect(response.data).toBeDefined();
                    expect(response.data.id).toBe(2);
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
                $httpBackend.expectPOST('/api/project/save')
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

        describe('method:: deleteProject', function () {
            beforeEach(function () {
                $httpBackend.expectPOST('/api/project/delete')
                    .respond(200);
            });

            it('should send a post request to /api/project/delete', function () {
                AdminService.deleteProject(12).then(function (response) {
                    expect(response).toBeDefined();
                    expect(response.status).toBe(200);
                });
            });
        });
    });
});
