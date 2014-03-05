'use strict';

describe('Blog:: BlogDirective', function () {

    beforeEach(module('dc-cache'));
    beforeEach(module('dc-blog'));

    var template = '<div>' +
        '<h3>{{ blog.title }}</h3>' +
        '<small>{{ blog.date }}</small>' +
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
        scope.dcBlogArticle = {date: new Date()};

        element = angular.element('<div dc-blog></div>');
        $compile(element)(scope);
    }));

    it('should have header', function () {
        $httpBackend.expectGET('partials/blogDirective.html')
            .respond(template);

        scope.$digest();
        $httpBackend.flush();
        console.log(element.find('h3'));
        expect(element).toBe(true);
        expect(element.hasClass('ng-scope')).toBe(true);
    });
});
