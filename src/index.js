//require('dotenv').config({path : '.env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({ 
    path: './.env' 
});



connectDB()
.then(()=>{
    console.log("MONGO db connected succesfully");
    const port = process.env.PORT || 4000;
    app.listen(port,()=>{
        console.log(`Server is serving on the PORT number`,port)
    })
})
.catch((err) =>{
    console.log("MONGO db connection failed !!!",err)
})















































































/* 

// db connection first approach  
    1. IIFE to connect to the db 
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
;(async()=>{
   try{
    
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error",(error)=>{  /// "error" is the event when occor when there is error in connection with db
        console.log("Error: Express is unable to talk to db",error)
        throw error
    })  /// app/express unable to talt to the db
    app.listen(process.env.PORT,()=>{
        console.log("Server is Stated:"+process.env.PORT)
    })
   }catch(error){
    console.error("Error: while connecting with the db ",error)
    throw error
   }
})()*/