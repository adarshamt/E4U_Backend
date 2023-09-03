const productSchema = require("../model/productSchema")

const cloudinary = require('cloudinary').v2


cloudinary.config({ 
     cloud_name: 'dcy1nhstg', 
     api_key: '359642551777749', 
     api_secret: 'ochqSnaOORPVryrlm9q0oFPEXRU' 
   });

// ********** addd product ***********

const addproduct = async (req,res)=>{
     const {productName,discription,price,category} = req.body

      const files = req.files.images
      cloudinary.uploader.upload(files.tempFilePath,(err,result)=>{

          console.log("results",result)
          //    const images = req.files.map(({path , originalname}) => ({path , originalname}))
          
             const product = new productSchema ({
               productName,
               discription,
               price,
               category,
               images: result.url
          
             })
          
              product.save()
               
               res.json({
                    status:'success',
                    message:"product created",
                    data:product
               })
      })
     console.log(files)
     
}




module.exports ={addproduct}