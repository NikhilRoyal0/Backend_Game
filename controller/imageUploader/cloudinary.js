const cloudinary = require('./../../db/cloudinary');

module.exports.uploadMedia = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (error, result) => {
            if (error) {
                console.error(error);
                reject('Failed to upload image to Cloudinary');
            } else {
                const imageUrl = result.secure_url;
                
                resolve(imageUrl);
            }
        }).end(fileBuffer);
    });
};
