import mongoose from "mongoose";

// create a schema for login information//
const loginschema = new mongoose.Schema({
    username:{
        type: [String,Number],
        required:true
    },
    password:{
        type: [String,Number],
        required:true
    }
});const collection= new mongoose.model("authentication",loginschema)

export default collection;