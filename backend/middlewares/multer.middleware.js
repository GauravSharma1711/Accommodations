import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
  })
  
 export const upload = multer({
     storage,
     limits:{
        fileSize:1*1000*1000 //1 MB 
     }
    
    })

    //in routes
    // upload.single('avatar');
    //upload.array('photos',12);