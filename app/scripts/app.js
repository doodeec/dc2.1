'use strict';

angular.module('dc21App', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'dc-blog',
        'dc-project',
        'dc-admin',
        'dc-loader',
        'dc-cache',
        'dc-socket'
    ])
    .config(function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/main',
                controller: 'MainCtrl'
            })
            .when('/login', {
                templateUrl: 'partials/login',
                controller: 'LoginCtrl'
            })
            .when('/blog/:id', {
                templateUrl: 'partials/blog',
                controller: 'BlogCtrl'
            })
            .when('/projects', {
                templateUrl: 'partials/projects',
                controller: 'ProjectsCtrl'
            })
            .when('/project/:id', {
                templateUrl: 'partials/project',
                controller: 'ProjectCtrl'
            })
            .when('/contact', {
                templateUrl: 'partials/contact',
                controller: 'ContactCtrl'
            })
            .when('/admin', {
                templateUrl: 'partials/admin',
                controller: 'AdminCtrl',
                authenticate: true
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);

        // Intercept 401s and redirect you to login
        $httpProvider.interceptors.push(['$q', '$location', 'LoaderService',
            function ($q, $location, LoaderService) {
                return {
                    'responseError': function (response) {
                        if (response.status === 401) {
                            $location.path('/login');
                            return $q.reject(response);
                        }
                        else {
                            return $q.reject(response);
                        }
                    },
                    'request': function (config) {
                        LoaderService.register(config.url);
                        return config || $q.when(config);
                    },
                    'response': function (response) {
                        LoaderService.unregister(response.config.url);
                        return response || $q.when(response);
                    }
                };
            }]);
    })
    .run(function ($rootScope, $location, Auth, LoaderService) {
        $rootScope.activeLoader = LoaderService.activeLoader;
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (next.authenticate && !Auth.isLoggedIn()) {
                $location.path('/login');
            }
        });
    });