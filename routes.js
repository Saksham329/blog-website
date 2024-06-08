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

const app = express()
const Port = process.env.port || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mongourl = "mongodb+srv://shivamssharma398:desikala852@cluster0.k7aejv2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// set the view engine and location for static files//
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())
app.use(methodOverride('_method'));

// creating the routes//
app.get("/about",(req,res)=>{
    res.render("about.ejs")
});

app.get("/contact",(req,res)=>{
    res.render("contact.ejs")
});

app.post("/contact",(req,res)=>{
    const alertMessage = 'Details submitted , we will reach you soon';
    const redirectUrl = '/home';
  
    res.send(`
      <script>
        alert("${alertMessage}");
        window.location.href = "${redirectUrl}";
      </script>
    `);
  });
    
app.get("/signin",(req,res)=>{
    res.render("signin.ejs")
 });
 // sign in route//
 
 app.post("/signin",async(req,res)=>{
    const data={ username : req.body.username,
      password : req.body.password
     }
 
     // checking if user already exists //
     const existinguser = await collection.findOne({username:data.username})
     const userdata = await collection.insertMany(data)
     if(existinguser){
         res.send("User already exists , please try another name")
     }
     else{
         const userdata = await collection.insertMany(data)
     };
     
     res.redirect("./")
     console.log(userdata)
 });
 
 // login route //
 app.get("/",(req,res)=>{
     res.render("Login.ejs")
 });
 // checking if the user exists or not , if yes open homepage//
 app.post("/login", async (req,res)=>{
     try {
         const checkuser = await collection.findOne({username:req.body.username});
         const checkpass = await collection.findOne({password : req.body.password});
 
 
         if(!checkuser){
             res.send("username not found")
         }
 
         else if(!checkpass){
             res.send("incorrect password")
         }
         
         else{
             res.redirect("/home")
         }
         
     } catch (error) {
         console.log(error)
     }
 });
 
 // route to create Blog//
 
 app.get("/createblog",(req,res)=>{
     res.render("createblog.ejs")});
 
 // save blog //
 app.post("/createblog",upload.single("logopic"), async(req,res)=>{
 
     const articledata={ 
         title : req.body.title,
         content: req.body.content,
         description : req.body.description,
         image:req.file.filename,
        };
     const articledata1 = await blogdata1.insertMany(articledata)
 
 console.log(req.body)
 console.log(req.file)
     res.redirect("/home")
 });
 
 
 // route to send written blog to home page and view it.//
 app.get('/home', async (req, res) => {
     try {
         const blog = await blogdata1.find();
         res.render('home', { blog: blog });
     } catch (err) {
         res.status(500).send(err);
     }
 });
 
 
 app.get('/blogs/:id', async (req, res) => {
     const blogId = req.params.id;
   
     try {
       const blog = await blogdata1.findById(blogId);
       if (!blog) {
         return res.status(404).send('Blog not found');
       }
       res.render('blog', { blog });
     } catch (err) {
       console.error(err);
       res.status(500).send('Error retrieving blog post');
     }
   });
 
 // Route to Edit blog //
 
 app.get('/blog/:id/edit',async(req,res)=>{
     const blogId = req.params.id;
   
     try {
       const blog = await blogdata1.findById(blogId);
       if (!blog) {
         return res.status(402).send('Blog not found');
       }
       res.render("blogedit", { blog });
     } catch (err) {
       console.error(err);
       res.status(500).send('Error retrieving blog post');
     }
 })
 
   
 app.put('/blog/:id/edit', upload.single('logopic'), async (req, res) => {
     const { title, content ,description} = req.body;
     const updatedData = { title, content ,description};
   
     if (req.file) {
       updatedData.image = req.file.filename;
     }
   
     await blogdata1.findByIdAndUpdate(req.params.id, updatedData);
     res.redirect(`/blogs/${req.params.id}`);
   });
 
 // route to delete a blog //
 app.get("/delete/:id",async(req,res)=>{
     const blogid = req.params.id
     try {
         await blogdata1.findByIdAndDelete(blogid)
         res.redirect("/home")
     } catch (error) {
         console.log(error)
     }
 })
   // starting the server//
 app.listen(Port,()=>{
     console.log(`server is running on port ${Port}`)
 });

 export default app