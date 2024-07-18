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
    },
    tls: {
        rejectUnauthorized: false
    }
})


export const sendVerificationEmail = async (userEmailId ) => {
    try {
        const otpValue = parseInt(Math.floor((Math.random() * 1000000)).toString() , 10);

        const mailContent = {
            from : 'userstest100@gmail.com',
            to : userEmailId ,
            subject : 'OTP Verification',
            html : 
                "<h2>Your Verification OTP for CareerUp Registration<h2>" + 
                "<h3>Here is your otp: <h3>" + "<br>" +
                '<h1>' + otpValue + '<h1>' ,
        };

        await transporter.sendMail(mailContent);
        return {otpValue , result: true}
    } catch (error) {
        console.log(error, 'Mail send error');
        return {
            result: false
        }
    }
};