import dotenv from 'dotenv';
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

//named export import {storage} from 'cloudstorage.js'
export const storage = new CloudinaryStorage({
    cloudinary, 
    params: {
        folder: 'gallery'  
    }
});

// import storageCloudinary from 'cloudstorage.js'
export default storage;