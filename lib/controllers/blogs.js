'use strict';

var mongoose = require('mongoose'),
    Article = mongoose.model('Article');

/**
 * Get blogs
 */
exports.loadAllBlogs = function (req, res) {
    return Article.find(function (err, articles) {
        if (!err) {
            return res.json(articles);
        } else {
            return res.send(err);
        }
    });
};

/**
 * Load one blog
 */
exports.loadOneBlog = function (req, res) {
    return Article.findOne({id: req.query.id}, function (err, article) {
        if (!err) {
            return res.json(article);
        } else {
            return res.send(err);
        }
    });
};

/**
 * Get homepage blogs
 */
exports.loadPublishedBlogs = function (req, res) {
    return Article.find({allowedHome: true}, function (err, articles) {
        if (!err) {
            return res.json(articles);
        } else {
            return res.send(err);
        }
    });
};

/**
 * Create blog
 */
exports.createBlog = function (req, res) {
    var newBlog = new Article(req.body);
    newBlog.save(function (err) {
        if (err) return res.json(400, err);

        return res.send(200);
    });
};

/**
 * Save blog
 */
exports.editBlog = function (req, res) {
    if (!req.body || !req.body.id) throw new Error('Blog id missing');

    Article.update({id: req.body.id}, {$set: req.body}, function (err) {
        if (err) return res.json(400, err);

        return res.send(200);
    });
};

/**
 * Delete blog
 */
exports.deleteBlog = function (req, res) {
    if (!req.body || !req.body.id) throw new Error('Blog id missing');

    Article.remove({id: req.body.id}, function (err) {
        if (err) return res.json(400, err);

        return res.send(200);
    });
};