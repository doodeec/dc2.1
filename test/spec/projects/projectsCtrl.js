'use strict';

describe('Projects:: ProjectsCtrl', function () {

    beforeEach(module('dc-cache'));
    beforeEach(module('dc-project'));

    var ProjectsCtrl,
        ProjectService,
        scope,
        $httpBackend;

    beforeEach(inject(function ($injector) {
        var $controller = $injector.get('$controller'),
            $rootScope = $injector.get('$rootScope');

        $httpBackend = $injector.get('$httpBackend');
        ProjectService = $injector.get('ProjectService');

        scope = $rootScope.$new();
        ProjectsCtrl = $controller('ProjectsCtrl', {
            $scope: scope,
            ProjectService: ProjectService
        });
    }));

    it('should load three projects', function () {
        $httpBackend.expectGET('/api/projects')
            .respond([
                {id: 1, title: 'Project 1'},
                {id: 2, title: 'Project 2'},
                {id: 3, title: 'Project 3'}
            ]);

        expect(scope.projects).toBeDefined();
        expect(scope.projects.length).toBe(0);
        $httpBackend.flush();
        expect(scope.projects.length).toBe(3);
    });

    it('should not load anything', function () {
        $httpBackend.expectGET('/api/projects')
            .respond(400);

        expect(scope.projects).toBeDefined();
        expect(scope.projects.length).toBe(0);
        $httpBackend.flush();
        expect(scope.projects.length).toBe(0);
    });
});
