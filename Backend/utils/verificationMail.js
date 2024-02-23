import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const NODEMAIL_EMAIL = process.env.NODEMAIL_EMAIL;
const NODEMAIL_PASS_KEY = process.env.NODEMAIL_PASS_KEY;

const transporter = nodemailer.createTransport({

    service : 'gmail',

    auth: {
        user : NODEMAIL_EMAIL,
        pass : NODEMAIL_PASS_KEY
    }
})


export const sendVerificationEmail = (userEmailId , res) => {

    const otpValue = parseInt(Math(Math.random() * 1000000).toString() , 10);

    const mailContent = {
        from : 'msharuk.b10@gmail.com',
        to : userEmailId ,
        subject : 'OTP Verification',
        html : 
            "<h2>Your Verification OTP for CareerUp Registration<h2>" + 
            "<h3>Here is your otp: <h3>" + "<br>" +
            '<h1>' + otpValue + '<h1>' ,
    }


    transporter.sendMail(mailContent , (error) => {
        if(error){
            return res.json({error : 'Verification email failed to send'})
        } else {
            res.sjon({message : 'Verification Email send successfully'});
        }
    })

    return otpValue;
};