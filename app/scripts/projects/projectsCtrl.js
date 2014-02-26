'use strict';

angular.module('dc-project')
    .controller('ProjectsCtrl', function ($scope, ProjectService) {
        // initialize empty array
        $scope.projects = [];

        $scope.loadingProjects = true;
        ProjectService.loadAllProjects().then(function (projects) {
            $scope.projects = projects.data;
            $scope.loadingProjects = false;
        }, function () {
            $scope.loadingProjects = true;
        });
    });