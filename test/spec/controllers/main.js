'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('dc21App'));

    var MainCtrl,
        BlogService,
        scope,
        $httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$httpBackend_, _BlogService_, $controller, $rootScope) {
        $httpBackend = _$httpBackend_;
        BlogService = _BlogService_;

        $httpBackend.expectGET('/api/blogs/home')
            .respond([
                {id: 1, title: 'Blog 1'},
                {id: 2, title: 'Blog 5'}
            ]);

        $httpBackend.expectGET('/api/blogs')
            .respond([
                {id: 1, title: 'Blog 1'},
                {id: 2, title: 'Blog 2'},
                {id: 2, title: 'Blog 5'}
            ]);

        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope, BlogService: BlogService
        });
    }));

    it('should attach a list of 2 blogs to the scope.blogArticles', function () {
        expect(scope.blogArticles).toBeUndefined();
        $httpBackend.flush();
        expect(scope.blogArticles.length).toBe(2);
    });

    it('should attach a list of 3 blogs to the scope.allBlogs', function () {
        expect(scope.allBlogs).toBeUndefined();
        $httpBackend.flush();
        expect(scope.allBlogs.length).toBe(3);
    });
});
