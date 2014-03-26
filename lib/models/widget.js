'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Widget Schema
 */
var WidgetSchema = new Schema({
    id: String,
    type: String,
    position: String,
    priority: Number,
    size: {
        x: Number,
        y: Number
    }
});

mongoose.model('Widget', WidgetSchema);
