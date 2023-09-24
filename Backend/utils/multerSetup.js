import multer from 'multer';
import path from 'path';
import express from 'express';

const upload = multer({
    storage : multer.diskStorage({}) ,

    fileFilter : (req, file , cb) => {

        let ext = path.extname(file.originalname);

        if(ext !== '.jpg' && ext !== 'jpeg' && ext !== '.png' && ext !== '.mp4') {

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