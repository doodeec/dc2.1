'use strict';

angular.module(window.ngAppName)
    .controller('MainCtrl', function ($scope, BlogService, Socket, Widget) {
        $scope.widgets = [];

        BlogService.loadBlogs().then(function (blogArticles) {
            $scope.blogArticles = blogArticles.data;
        });

        BlogService.loadAllBlogs().then(function (blogArticles) {
            $scope.allBlogs = blogArticles.data;
        });

        /*Socket.on('success', function (data) {
         console.log(data);
         });*/

        //TODO just demo functionality
        Widget.loadAll().then(function (wgts) {
            $scope.widgets = wgts;
            console.log(Widget.all);

//            Widget.load('blog widget').priority = 2000;

            var wgt = Widget.load('blog widget');
            if (wgt) console.log(wgt.getPosition());

            Widget.create({id: 'newW2'});
        });
    });