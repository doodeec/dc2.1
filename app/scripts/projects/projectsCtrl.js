'use strict';

angular.module('dc-project')
    .controller('ProjectsCtrl', function ($scope, ProjectService) {
        function stopLoading() {
            $scope.loadingProjects = false;
        }

        // initialize empty array
        $scope.projects = [];

        $scope.loadingProjects = true;
        ProjectService.loadAllProjects().then(function (projects) {
            $scope.projects = projects.data;
            stopLoading();
        }, stopLoading);
    });