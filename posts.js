import mongoose from "mongoose";

// schema for saving blog information //
const article = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
});
//collection part//


const blogdata1= new mongoose.model("collection",article)

export default blogdata1;