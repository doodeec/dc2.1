'use strict';

describe('Directive:: Navbar', function () {

    beforeEach(module('dc21App'));

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

    it('should mark menu item as active', function () {
        scope.$digest();
        expect(scope.isActive('/')).toBe(true);
        expect(angular.element(element.find('li')[0]).hasClass('active')).toBe(true);
    });
});
