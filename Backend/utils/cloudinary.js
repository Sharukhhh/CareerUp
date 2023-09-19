import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,

    cloud_api : process.env.CLOUDINARY_API,

    cloud_secret : process.env.CLOUDINARY_SECRET_KEY
});


export default cloudinary;