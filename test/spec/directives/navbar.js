'use strict';

describe('Directive:: Navbar', function () {

    beforeEach(module('dc21App'));

    var template = '<div class="header">' +
        '<ul class="nav pull-right">' +
        '<li ng-repeat="item in menu" ng-class="{active: isActive(item.link)}">' +
        '<a ng-href="{{item.link}}">{{item.title}}</a>' +
        '</li>' +
        '</ul>' +
        '<h3>DC<small>2.1</small></h3>' +
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

        element = angular.element('<div dc-navbar></div>');
        $compile(element)(scope);
    }));

    it('should have isActive method defined on a scope', function () {
        scope.$digest();
        expect(scope.isActive).toBeDefined();
    });

    it('should create menu array on a scope', function () {
        scope.$digest();
        expect(scope.menu).toBeDefined();
        expect(scope.menu.length).toBe(4);
    });
});
