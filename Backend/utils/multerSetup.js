import multer from 'multer';
import path from 'path';
import express from 'express';

const upload = multer({
    storage : multer.diskStorage({
        destination : (req, file, cb) => {
            cb(null , '../Frontend/public/resumes/');
        },

        filename : (req, file, cb) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);

            cb(null, `${uniqueSuffix}-${file.originalname}`);
        }
    }) ,

    fileFilter : (req, file , cb) => {

        let ext = path.extname(file.originalname);
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.mp4', '.jfif', '.pdf' , '.svg'];

        if(!allowedExtensions.includes(ext.toLowerCase())) {

            const error = new multer.MulterError('Unsupported file type!');
            new Error("File type is not supported");
            error.status = 401;
            cb(error, false);
            return;
        }
        cb(null , true);
    } 
});


export default upload;