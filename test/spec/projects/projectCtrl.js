'use strict';

describe('Projects:: ProjectCtrl', function () {

    beforeEach(module('dc-cache'));
    beforeEach(module('dc-project'));

    var ProjectCtrl,
        ProjectService,
        scope,
        $httpBackend,
        $routeParams;

    beforeEach(inject(function ($injector) {
        var $controller = $injector.get('$controller'),
            $rootScope = $injector.get('$rootScope');

        $httpBackend = $injector.get('$httpBackend');
        ProjectService = $injector.get('ProjectService');

        $routeParams = {id: 1};

        /*$httpBackend.expectGET('/api/project?id=1')
         .respond({id: 1, title: 'Project 1'});*/

        scope = $rootScope.$new();
        ProjectCtrl = $controller('ProjectCtrl', {
            $scope: scope,
            $routeParams: $routeParams,
            ProjectService: ProjectService
        });
    }));

    it('should load one project', function () {
        $httpBackend.expectGET('/api/project?id=1')
            .respond({id: 1, title: 'Project 1'});

        expect(scope.project).toBeDefined();
        expect(scope.project.id).toBeUndefined();
        $httpBackend.flush();
        expect(scope.project.id).toBe(1);
    });

    it('should not load anything', function () {
        $httpBackend.expectGET('/api/project?id=1')
            .respond(400);

        expect(scope.project).toBeDefined();
        expect(scope.project.id).toBeUndefined();
        $httpBackend.flush();
        expect(scope.project.id).toBeUndefined();
    });
});
