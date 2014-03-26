'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Project = mongoose.model('Project'),
    Article = mongoose.model('Article'),
    Widget = mongoose.model('Widget');

/**
 * Populate database with sample application data
 */

Article.find({}).remove(function () {
    Article.create({
            title: 'Test Blog 1',
            id: 'test-blog-1',
            date: new Date(),
            shortDesc: 'This is a short description of a new test blog',
            content: [
                {
                    header: 'First',
                    text: 'This is first paragraph',
                    images: [
                        {
                            url: 'http://www.principalspage.com/theblog/wp-content/uploads//2014/02/BlogMore2.jpg',
                            label: 'First image'
                        },
                        {
                            url: 'http://blog.theravid.com/wp-content/uploads/2013/03/blog-3.jpg',
                            label: null
                        }
                    ]
                },
                {
                    header: 'Second',
                    text: 'This is second paragraph',
                    images: []
                }
            ],
            allowedHome: true
        }, {
            title: 'Test Blog 2',
            id: 'test-blog-2',
            date: new Date(),
            shortDesc: 'This is a short description of another blog',
            content: [
                {
                    header: 'First paragraph',
                    text: 'This is text of paragraph',
                    images: []
                }
            ],
            allowedHome: false
        }, {
            title: 'Test Blog 3',
            id: 'test-blog-3',
            date: new Date(),
            shortDesc: 'Test blog 3 is amazing new blog',
            content: [
                {
                    header: 'What?',
                    text: 'Nothing...',
                    images: []
                }
            ],
            allowedHome: true
        }, function () {
            console.log('finished populating article');
        }
    );
});

User.find({}).remove(function () {
    User.create({
            provider: 'local',
            name: 'Admin Duso',
            email: 'admin@doodeec.com',
            password: 'test'
        }, function () {
            console.log('finished populating users');
        }
    );
});

Project.find({}).remove(function () {
    Project.create({
            title: 'Project 1',
            id: 'project-1',
            shortDesc: 'short description of project 1',
            description: 'This is test project. It is the first project and it has no images and no' +
                'github link'
        }, {
            title: 'Project 2',
            id: 'project-2',
            shortDesc: 'short description of project 2',
            description: 'This is test project. It is the second project and it has URL and github link',
            github: 'http://github.com/',
            url: 'www.google.com'
        }, function () {
            console.log('finished populating projects');
        }
    );
});

Widget.find({}).remove(function () {
    Widget.create({
            id: 'blog widget',
            type: 'blog',
            position: 'position-1',
            priority: 20,
            size: {
                x: 600,
                y: 400
            }
        }, {
            id: 'projects widget',
            type: 'project',
            position: 'position-1',
            priority: 10,
            size: {
                x: 600,
                y: 300
            }
        }, function () {
            console.log('finished populating widgets');
        }
    );
});
