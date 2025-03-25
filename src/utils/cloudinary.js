import dotenv from "dotenv"
dotenv.config(
    { 
        path: './.env'   ///  i don't know what the issue?? without configuring the dotenv here it not working if you know let me know
    }
);
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
)

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        //console.log(localFilePath)

        if(!localFilePath) return null
        //upload the file on the cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        })
        //file has been uploaded successfully
        //console.log("file is uploaded on cloudinary",response);
        fs.unlinkSync(localFilePath)
        return response;

    } catch(error){
        console.error("Cloudinary Upload Error:", error);
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation go tfailed

        return null
    }
}

export {uploadOnCloudinary}