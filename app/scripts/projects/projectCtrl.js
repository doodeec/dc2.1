'use strict';

angular.module('dc-project')
    .controller('ProjectCtrl', function ($scope, $location, $routeParams, ProjectService) {
        function stopLoading() {
            $scope.loadingProject = false;
        }

        $scope.backToList = function () {
            $location.path('/projects');
        };

        // initialize empty object
        $scope.project = {};

        $scope.loadingProject = true;
        ProjectService.loadProject($routeParams.id).then(function (project) {
            $scope.project = project.data;
            stopLoading();
        }, stopLoading);
    });