const router = require("express").Router()
const story = require('../models/story');
const comment = require('../models/comment');
var ObjectId = require('mongodb').ObjectID;

router.get('/get-comments', async(req, res, next) => {

    try {

        var found = await comment.find({"storyID": req.body.storyID});
        
        if(Object.keys(found).length === 0)
            throw ("No comments Found");
        else
        {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(found);
        }
    }
    catch(err)
    {
        next(err);
    }
});

router.post('/post-comments', async(req,res,next) => {

    try {
        // var found =await story.find({"id": req.body.storyID});
        var found =await story.findById(ObjectId(req.body.storyID));
        console.log(found);
        // console.log(await story.find());
        if(Object.keys(found).length === 0)
            throw ("Invalid Story ID");
        
        else
        {
            var post_req = {
                "storyID": req.body.storyID,
                "CommText": req.body.CommText,
                "Timestamp": Date()
            };

            console.log(post_req);
            post_res = await comment.create(post_req);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json("Comment added successfully");

        }
    }
    catch(err)
    {
        next(err);
    }
});

module.exports = router;