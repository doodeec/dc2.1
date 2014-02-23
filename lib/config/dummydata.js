'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Article = mongoose.model('Article');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
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
                    images: []
                },
                {
                    header: null,
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
        }, function () {
            console.log('finished populating article');
        }
    );
});

// Clear old users, then add a default user
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
