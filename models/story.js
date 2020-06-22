const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const StorySchema = mongoose.Schema({
    img: [{
        url: String,
        idImageCloud: String
    }]
    ,
    caption: {
        type: String,
        required : true
    }

})

module.exports = mongoose.model('Story', StorySchema);