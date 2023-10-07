import multer from 'multer';
import path from 'path';
import express from 'express';

const upload = multer({
    storage : multer.diskStorage({}) ,

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