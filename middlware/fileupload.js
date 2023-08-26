const multer = require('multer')


const path =require('path')


const storage = multer.diskStorage({

  destination: (rq,res,cb)=>{
    cb(null,'../images')
  },
  filename : (req,file,cb)=>{
    console.log(filename)
    cb(null,Date.now() + path.filename(file.originalname))
  }

})

const upload = multer({storage:storage})

module.exports=upload;