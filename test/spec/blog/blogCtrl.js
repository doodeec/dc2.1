'use strict';

describe('Blog:: BlogCtrl', function () {

    beforeEach(module('dc-cache'));
    beforeEach(module('dc-blog'));

    var BlogCtrl,
        BlogService,
        scope,
        $httpBackend,
        $routeParams;

    beforeEach(inject(function ($injector) {
        var $controller = $injector.get('$controller'),
            $rootScope = $injector.get('$rootScope');

        $httpBackend = $injector.get('$httpBackend');
        BlogService = $injector.get('BlogService');
        $routeParams = {id: 5};

        $httpBackend.expectGET('/api/blog?id=5')
            .respond({id: 5, title: 'Blog 5'});

        scope = $rootScope.$new();
        BlogCtrl = $controller('BlogCtrl', {
            $scope: scope, BlogService: BlogService, $routeParams: $routeParams
        });
    }));

    it('should call reload and load blog with id 5', function () {
        expect(scope.blog).toBe(null);
        $httpBackend.flush();
        expect(scope.blog.id).toBe(5);
    });
});
