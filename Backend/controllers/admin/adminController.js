import adminModel from "../../models/admin.js";
import jwt from "jsonwebtoken";


export const adminLogin = async (req, res) => {
    try {
        const {email ,password} = req.body;

        const admin = await adminModel.findOne({email});

        if(!admin){
            return res.status(400).json({message : 'Invalid credentials , admin not found'});
        } else {

            if(password === admin.password){
                return res.status(200).json({message : 'Login Successfull'});
            }
        }
    } catch (error) {
        console.log(error);
    }
}
