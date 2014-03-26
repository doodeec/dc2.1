'use strict';

var mongoose = require('mongoose'),
    Widget = mongoose.model('Widget');

/**
 * Load all available widgets
 */
exports.loadAllWidgets = function (req, res) {
    return Widget.find(function (err, wgts) {
        if (!err) {
            return res.json(wgts);
        } else {
            return res.send(err);
        }
    });
};

/**
 * Load widget according its ID
 */
exports.loadWidget = function (req, res) {
    return Widget.findOne({id: req.query.id}, function (err, wgt) {
        if (!err) {
            return res.json(wgt);
        } else {
            return res.send(err);
        }
    });
};

/**
 * Save/Update widget
 */
exports.saveWidget = function (req, res) {
    return Widget.update({id: req.body.id}, {$set: req.body}, function (err, wgt) {
        if (!err) {
            return res.json(wgt);
        } else {
            return res.send(err);
        }
    });
};

/**
 * Delete widget from DB
 */
exports.removeWidget = function (req, res) {
    return Widget.remove({id: req.body.id}, function (err) {
        if (err) return res.json(400, err);

        return res.send(200);
    });
};