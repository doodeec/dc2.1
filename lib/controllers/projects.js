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

exports.loadOneProject = function () {
};

exports.createProject = function () {
};

exports.editProject = function () {
};

exports.deleteProject = function () {
};