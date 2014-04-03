'use strict';

angular.module('dc21App')
    .controller('MainCtrl', function ($scope, BlogService, Socket, Widget) {
        $scope.widgets = [];

        BlogService.loadBlogs().then(function (blogArticles) {
            $scope.blogArticles = blogArticles.data;
        });

        BlogService.loadAllBlogs().then(function (blogArticles) {
            $scope.allBlogs = blogArticles.data;
        });

        Socket.on('success', function (data) {
            console.log(data);
        });

        //TODO just demo functionality
        Widget.loadAll().then(function (wgts) {
            $scope.widgets = wgts;
            console.log(Widget.all);

//            Widget.load('blog widget').priority = 2000;

            console.log(Widget.load('blog widget').getPosition());

            Widget.create({id: 'newW2'});
        });
    });
