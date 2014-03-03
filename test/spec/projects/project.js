'use strict';

describe('Projects:: ProjectService', function () {

    beforeEach(module('dc-cache'));
    beforeEach(module('dc-project'));

    var ProjectService,
        $httpBackend,
        CacheService;

    beforeEach(inject(function ($injector) {
        ProjectService = $injector.get('ProjectService');
        $httpBackend = $injector.get('$httpBackend');
        CacheService = $injector.get('CacheService');
    }));

    it('should have all methods defined', function () {
        expect(ProjectService.loadProject).toBeDefined();
        expect(ProjectService.loadAllProjects).toBeDefined();
    });

    describe('ProjectService:: loadAllProjects', function () {
        beforeEach(function () {
            $httpBackend.expectGET('/api/projects')
                .respond([
                    { id: 5 },
                    { id: 2 },
                    { id: 7 }
                ]);
        });

        afterEach(function () {
            $httpBackend.flush();
        });

        it('should send get projects request', function () {
            ProjectService.loadAllProjects().then(function (projects) {
                expect(projects).toBeDefined();
                expect(projects.status).toBe(200);
                expect(projects.data.length).toBe(3);
            });
        });

        it('should save projects to local cache', function () {
            var localCache = CacheService.get('projects');
            ProjectService.loadAllProjects().then(function (projects) {
                expect(projects.status).toBe(200);
                expect(typeof localCache.load('project.2')).toBe('object');
                expect(localCache.load('project.1')).toBe(false);
            });
        });
    });

    describe('ProjectService:: loadProject', function () {
        it('should send get project request', function () {
            $httpBackend.expectGET('/api/project?id=5')
                .respond({ id: 5 });

            ProjectService.loadProject(5).then(function (project) {
                expect(project).toBeDefined();
                expect(project.status).toBe(200);
                expect(project.data.id).toBe(5);
            });

            $httpBackend.flush();
        });

        it('should save project to local cache', function () {
            $httpBackend.expectGET('/api/project?id=5')
                .respond({ id: 5 });

            ProjectService.loadProject(5).then(function (project) {
                var localCache = CacheService.get('projects');
                expect(project.status).toBe(200);
                expect(typeof localCache.load('project.5')).toBe('object');
                expect(localCache.load('project.1')).toBe(false);
            });

            $httpBackend.flush();
        });

        it('should load project from local cache', function () {
            $httpBackend.expectGET('/api/projects')
                .respond([
                    { id: 5 },
                    { id: 2 },
                    { id: 7 }
                ]);

            ProjectService.loadAllProjects().then(function () {
                ProjectService.loadProject(5).then(function (project) {
                    expect(project.status).toBe(200);
                    expect(project.data.id).toBe(5);
                });
            });

            $httpBackend.flush();
        });
    });
});
