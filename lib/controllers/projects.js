'use strict';

var mongoose = require('mongoose'),
    Project = mongoose.model('Project');

/**
 * Get projects
 */
exports.loadAllProjects = function (req, res) {
    return Project.find(function (err, projects) {
        if (!err) {
            return res.json(projects);
        } else {
            return res.send(err);
        }
    });
};

/**
 * Get specific project
 */
exports.loadOneProject = function (req, res) {
    return Project.find({id: req.query.id}, function (err, project) {
        if (!err) {
            return res.json(project);
        } else {
            return res.send(err);
        }
    });
};

/**
 * Create new Project
 */
exports.createProject = function (req, res) {
    var newProj = new Project(req.body);
    newProj.save(function (err) {
        if (err) return res.json(400, err);

        return res.send(200);
    });
};

/**
 * Update existing project
 */
exports.editProject = function (req, res) {
    if (!req.body || !req.body.id) throw new Error('Project id missing');

    Project.update({id: req.body.id}, {$set: req.body}, function (err) {
        if (err) return res.json(400, err);

        return res.send(200);
    });
};

/**
 * Delete project with specific ID
 */
exports.deleteProject = function (req, res) {
    if (!req.body || !req.body.id) throw new Error('Project id missing');

    Project.remove({id: req.body.id}, function (err) {
        if (err) return res.json(400, err);

        return res.send(200);
    });
};