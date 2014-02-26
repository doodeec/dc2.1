'use strict';

angular.module('dc-project')
    .controller('ProjectCtrl', function ($scope, $routeParams, ProjectService) {
        // initialize empty object
        $scope.project = {};

        $scope.loadingProject = true;
        ProjectService.loadProject($routeParams.id).then(function (project) {
            $scope.project = project.data;
            $scope.loadingProject = false;
        }, function () {
            $scope.loadingProject = false;
        });
    });