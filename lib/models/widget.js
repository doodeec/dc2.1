'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Widget Schema
 */
var WidgetSchema = new Schema({
    id: String,
    widgetType: {
        type: String,
        default: 'default'
    },
    position: {
        type: String,
        default: 'default'
    },
    priority: {
        type: Number,
        default: 0
    },
    size: {
        x: {
            type: Number,
            default: 600
        },
        y: {
            type: Number,
            default: 400
        }
    }
});

mongoose.model('Widget', WidgetSchema);
