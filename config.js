import mongoose from "mongoose"
const mongourl = process.env.MONGO_URL;
// connecting to mongoose database//

mongoose.connect(mongourl).then(()=>{
    console.log("database is connected succesfully")
}).catch((error)=>{console.log(error)});

// create a schema//
 const loginschema = new mongoose.Schema({
    username:{
        type: [String,Number],
        required:true
    },
    password:{
        type: [String,Number],
        required:true
    }
});
//collection part//

export const collection= new mongoose.model("authentication",loginschema)

