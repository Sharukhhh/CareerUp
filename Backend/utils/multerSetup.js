import multer, { diskStorage } from 'multer';
import path from 'path';
import express from 'express';
import userModel from '../models/userModel.js';
import { fileURLToPath } from 'url';

// Get the directory of the current module using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const upload = multer({
    storage : diskStorage({
        destination  : (req, file, cb) => {
            let destinationPath = '';
            if(file.fieldname === 'resume'){
                destinationPath = path.join(__dirname , '..' , 'public' , 'resumes');
            } else if (file.fieldname === 'profileImage'){
                destinationPath = path.join(__dirname , '..' , 'public' , 'user profiles');
            } else {
                destinationPath = path.join(__dirname , '..' , 'public' , 'other items');
            }

            cb (null , destinationPath);
        },

        filename : async (req, file, cb) => {
            // async function getUniqueFileName() {
            //     try {
            //         const user = await userModel.findById(req.user._id);
        
            //         if (!user) {
            //         return cb(new Error('User not found'));
            //         }
        
            //         const uniqueFileName = `${user.name}_${file.fieldname}_${Date.now()}-${file.originalname}`;
                    cb(null, `${Date.now()}-${file.originalname}`);
            //     } catch (err) {
            //         return cb(err);
            //     }
            // }

            // getUniqueFileName();
        }
    }),

    fileFilter : (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const allowedExtensions = ['.pdf' , '.jpg', '.jpeg', '.png', '.mp4', '.jfif', '.pdf' , '.svg'];
    
        if (!allowedExtensions.includes(ext.toLowerCase())) {
            const error = new multer.MulterError('Unsupported file type!');
            error.status = 401;
            cb(error, false);
            return;
        }
        cb(null, true);
    }
});

export default upload;

