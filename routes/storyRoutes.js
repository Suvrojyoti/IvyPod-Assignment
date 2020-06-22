const router = require("express").Router()
const upload = require('../multer')
const story = require('../models/story');
const cloudinary = require('../cloudinary')
const fs = require('fs');

router.get('/get-images', upload.array('image'), async (req, res, next) => {
      
    try{
      var page = parseInt(req.body.page,10);
      var elements_per_page = parseInt(req.body.elements_per_page,10);
      
      var cnt = await story.find().count();
      var message_response;
      if( cnt<=(page-1)*elements_per_page || page<=0 || elements_per_page<=0 )
      {
          throw("Invalid Page Reference");
      }
      if(cnt > page*elements_per_page)
      {
          message_response = await story.find().skip((page-1)*elements_per_page).limit(elements_per_page);
      }
      else
      {
          message_response = await story.find().skip((page-1)*elements_per_page);
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(message_response);
    }
    catch(err)
    {
        next(err);
    }
});
  
router.post('/upload-images', upload.array('image'), async (req, res, next) => {
    try{

        const uploader = async (path) => await cloudinary.uploads(path, 'Images');
        const urls = []
        const files = req.files;
        const Img=[];

        for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        Img.push({
            "url": newPath.url,
            "idImageCloud": newPath.id
        });
        fs.unlinkSync(path)
        }

        var inserted_object = {
            "img": Img,
            "caption": req.body.caption
        }

        console.log(inserted_object);
        Story= await story.create(inserted_object);

        res.status(200).json({
        message: 'images uploaded successfully',
        data: Story
        })
    }
    catch(err)
    {
        next(err);
    }
})

module.exports = router;