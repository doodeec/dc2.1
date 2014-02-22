'use strict';

describe('Controller: BlogCtrl', function () {

    // load the controller's module
    beforeEach(module('dc-blog'));

    var BlogCtrl,
        BlogService,
        scope,
        $httpBackend,
        $routeParams;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$httpBackend_, _BlogService_, $controller, $rootScope) {
        $httpBackend = _$httpBackend_;
        BlogService = _BlogService_;
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
