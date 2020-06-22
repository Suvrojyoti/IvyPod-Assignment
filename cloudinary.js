const cloudinary = require('cloudinary');
const dotenv=require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: 'suvrocloud',
    api_key: '364312642925412',
    api_secret: '1kqnRRhVJQa3u94qWYOAsVKs1oQ'
})

exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id
            })
        }, {
            resource_type: "auto",
            folder: folder
        })
    })
}
