'use strict';

angular.module('dc-project')
    .controller('ProjectCtrl', function ($scope, $routeParams, ProjectService) {
        function stopLoading() {
            $scope.loadingProject = false;
        }

        // initialize empty object
        $scope.project = {};

        $scope.loadingProject = true;
        ProjectService.loadProject($routeParams.id).then(function (project) {
            $scope.project = project.data;
            stopLoading();
        }, stopLoading);
    });