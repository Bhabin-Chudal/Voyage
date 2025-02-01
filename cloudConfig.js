require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// this is like entering our credentials in google drive to get connected to google cloud.
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});



 
 
//this is like a certain folder in google drive(for analogy) to store our image
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Voyage_DEV',
    allowedFormat: ["png","jpeg","jpg"], 
  },
});

module.exports={cloudinary,storage}