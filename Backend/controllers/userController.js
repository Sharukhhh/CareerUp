import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';


export const userProfile = async (req, res) => {
    try {
        console.log(req.headers);
    } catch (error) {
        console.log(error);
    }
}