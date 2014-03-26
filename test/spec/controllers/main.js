'use strict';

describe('Controller:: MainCtrl', function () {

    beforeEach(module('dc21App'));

    var MainCtrl,
        BlogService,
        scope,
        $httpBackend;

    beforeEach(inject(function ($injector) {
        var $controller = $injector.get('$controller'),
            $rootScope = $injector.get('$rootScope');

        $httpBackend = $injector.get('$httpBackend');
        BlogService = $injector.get('BlogService');

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
