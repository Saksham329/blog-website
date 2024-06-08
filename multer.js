import multer from "multer";

// setting up multer//
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"./public/upload")
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`);
    },
    
});
const upload = multer({storage});

export default upload