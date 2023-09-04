const productSchema = require("../model/productSchema")

const cloudinary = require('cloudinary').v2


cloudinary.config({ 
     cloud_name: 'dcy1nhstg', 
     api_key: '359642551777749', 
     api_secret: 'ochqSnaOORPVryrlm9q0oFPEXRU' 
   });

// ********** addd product ***********

const addproduct = async (req,res)=>

     {

        try{
               const {productName,discription,price,category} = req.body
                 console.log("product name",productName)

                console.log("req files",req.files)

                  //  const files = req.files.images
                 //  cloudinary.uploader.upload(files.tempFilePath,(err,result)=>{

                  //      console.log("results",result)
    
             cloudinary.uploader.upload(req.files.path,async (err,result)=>{


                    if(err)
                    {

                       console.log("clodinary error",err)
                       return res.status(500).json({error:"Error uploading to cloudinary"})
                    }

                    //   res.status(200).json({url:req.url})

                    console.log("results",result)

                    const product = new productSchema ({
                      productName,
                      discription,
                      price,
                      category,
                      images:  result.secure_url
                 
                    })
                 
                    await product.save()
                      
                      res.json({
                           status:'success',
                           message:"product created",
                           data:product
                      })
          })

     //************adding multiple images ***********/


          //    const images = req.files.map(({path , originalname}) => ({path , originalname}))
          
     //  })
     // console.log(files)
   }


          

          catch(err){

               console.log("error catched",err)
          }
     
}




module.exports ={addproduct}