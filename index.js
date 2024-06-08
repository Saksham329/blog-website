
//importing the required modules:-//
import express from "express"
import bodyParser from "body-parser"
import path from "path"
import { fileURLToPath } from "url"
import dotenv from "dotenv"
import mongoose from "mongoose"
import multer from "multer"
import methodOverride from 'method-override';

import collection from "./users.js"
import blogdata1 from "./posts.js"
import upload from "./multer.js"
import app from "./routes.js"

dotenv.config();

// setting up the imported modules//

const Port = process.env.port || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mongourl = "mongodb+srv://shivamssharma398:desikala852@cluster0.k7aejv2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



// connecting to mongoose database//

mongoose.connect(mongourl).then(()=>{
    console.log("database is connected succesfully")
}).catch((error)=>{console.log(error)});
