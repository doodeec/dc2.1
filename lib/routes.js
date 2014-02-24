'use strict';

var api = require('./controllers/api'),
    blogs = require('./controllers/blogs'),
    projects = require('./controllers/projects'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function (app) {

    // Server API Routes

    // Blog
    app.get('/api/blog', blogs.loadOneBlog);
    app.post('/api/blog/create', blogs.createBlog);
    app.post('/api/blog/save', blogs.saveBlog);
    app.post('/api/blog/delete', blogs.deleteBlog);
    app.get('/api/blogs', blogs.loadAllBlogs);
    app.get('/api/blogs/home', blogs.loadPublishedBlogs);

    // Project
    app.get('/api/project', projects.loadOneProject);
    app.post('/api/project/create', projects.createProject);
    app.post('/api/project/save', projects.editProject);
    app.post('/api/project/delete', projects.deleteProject);
    app.get('/api/projects', projects.loadAllProjects);

    // User
    app.put('/api/users', users.changePassword);
    app.get('/api/users/me', users.me);
    app.get('/api/users/:id', users.show);

    // Session
    app.post('/api/session', session.login);
    app.del('/api/session', session.logout);

    // All undefined api routes should return a 404
    app.get('/api/*', function (req, res) {
        res.send(404);
    });

    // All other routes to use Angular routing in app/scripts/app.js
    app.get('/partials/*', index.partials);
    app.get('/*', middleware.setUserCookie, index.index);
};