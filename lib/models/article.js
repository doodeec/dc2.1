'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
    title: String,
    id: String,
    date: { type: Date, default: Date.now },
    shortDesc: String,
    content: [
        {
            header: String,
            text: String,
            images: [
                {
                    url: String,
                    label: String
                }
            ]
        }
    ],
    allowedHome: Boolean
});

mongoose.model('Article', ArticleSchema);
