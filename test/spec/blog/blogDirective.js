'use strict';

describe('Blog:: BlogDirective', function () {

    beforeEach(module('dc-cache'));
    beforeEach(module('dc-blog'));

    var template = '<div>' +
        '<h3>{{ blog.title }}</h3>' +
        '<small>{{ date }}</small>' +
        '<p>{{ blog.shortDesc }}</p>' +
        '<a ng-href="blog/{{ blog.id }}" class="btn btn-info btn-large">Read more</a>' +
        '</div>';

    var $rootScope,
        $httpBackend,
        element,
        scope;

    beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        $httpBackend = $injector.get('$httpBackend');

        var $compile = $injector.get('$compile');
        scope = $rootScope.$new();
        scope.dcBlogArticle = {
            title: 'Test blog title',
            date: new Date('2014-01-01T12:00:00'),
            shortDesc: 'my short desc'
        };

        element = angular.element('<div dc-blog dc-blog-article="dcBlogArticle"></div>');
        $compile(element)(scope);
    }));

    it('should create an isolated scope', function () {
        $httpBackend.expectGET('partials/blogDirective.html')
            .respond(template);

        scope.$digest();
        $httpBackend.flush();
        expect(element).toBeDefined();
        expect(element.hasClass('ng-isolate-scope')).toBe(true);
    });

    it('should have header', function () {
        $httpBackend.expectGET('partials/blogDirective.html')
            .respond(template);

        scope.$digest();
        $httpBackend.flush();
        expect(element.isolateScope().blog.title).toBe('Test blog title');
        expect(element.find('h3').html()).toBe('Test blog title');
    });

    it('should have date defined', function () {
        $httpBackend.expectGET('partials/blogDirective.html')
            .respond(template);

        scope.$digest();
        $httpBackend.flush();
        expect(element.isolateScope().date).toBe('1. 1. 2014');
        expect(element.find('small').html()).toBe('1. 1. 2014');
    });

    it('should have short description', function () {
        $httpBackend.expectGET('partials/blogDirective.html')
            .respond(template);

        scope.$digest();
        $httpBackend.flush();
        expect(element.isolateScope().blog.shortDesc).toBe('my short desc');
        expect(element.find('p').html()).toBe('my short desc');
    });
});
