const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const CommentSchema = mongoose.Schema({
    storyID: {
        type: String,
        required: true
    },
    CommText: {
        type: String,
        required: true
    },
    Timestamp: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Comment', CommentSchema);