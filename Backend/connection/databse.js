import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongo_uri = process.env.MONGO_URI;

export const connectDB = async () => {
    try {
        await mongoose.connect(mongo_uri);
        console.log('Successfully connected to db');
    } catch (error) {
        console.log('Failed to connect to db');
    }
}