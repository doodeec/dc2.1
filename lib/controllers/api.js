'use strict';

var mongoose = require('mongoose'),
    Article = mongoose.model('Article');

/**
 * Get blogs
 */
exports.allBlogs = function (req, res) {
    return Article.find(function (err, articles) {
        if (!err) {
            return res.json(articles);
        } else {
            return res.send(err);
        }
    });
};

/**
 * Get homepage blogs
 */
exports.publishedBlogs = function (req, res) {
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
exports.saveBlog = function (req, res) {
    if (!req.body || !req.body.id) throw new Error('Blog id missing');

    Article.update({id: req.body.id}, {$set: req.body}, function (err) {
        if (err) return res.json(400, err);

        return res.send(200);
    });
};