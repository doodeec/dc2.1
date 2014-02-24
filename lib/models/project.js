'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Project Schema
 */
var ProjectSchema = new Schema({
    title: String,
    id: String,
    shortDesc: String,
    description: String,
    github: { type: String, default: null },
    url: { type: String, default: null },
    images: [
        {
            url: String,
            label: String
        }
    ]
});

mongoose.model('Project', ProjectSchema);
