const productSchema = require("../model/productSchema")

 const cloudinary = require('../Cloudinary/cloudinary')

const fs = require('fs')


// cloudinary.config({ 
//      cloud_name: 'dcy1nhstg', 
//      api_key: '359642551777749', 
//      api_secret: 'ochqSnaOORPVryrlm9q0oFPEXRU' 
//    }); 
//   
// ********** addd product ***********

const addproduct = async (req,res)=>

     {

        try{
               const {productName,discription,price,category} = req.body
                 console.log("product name",productName)

                console.log("req files",req.files)

                 const uploader = async ( path)=> await cloudinary.uploads(path,'images')
                 
                 if ( req.method == "POST"){

                    const urls =[]
                    const files = req.files
                    
                    for ( const file of files ){
                         
                         const { path } = file
                         console.log("paths",path)
                         
                       const newPath = await uploader(path)
                         console.log("new path :",newPath)
                         
                         urls.push(newPath)
                         
                         fs.unlinkSync(path)
                    }

                    
                    res.status(200).json({
                         
                         message : "image uploaded sussesfull",  
                    data:urls
               })
          }
               
                else{

                    res.status(400).json({
                         err: " image not uploaded"
                    })
                }



                  //  const files = req.files.images
                 //  cloudinary.uploader.upload(files.tempFilePath,(err,result)=>{

                  //      console.log("results",result)
    

               //    **************Cloudinar uploading **********

          //    cloudinary.uploader.upload(req.file.path,async (err,result)=>{


                    // if(err)
                    // {

                    //    console.log("clodinary error",err)
                    //    return res.status(500).json({error:"Error uploading to cloudinary"})
                    // }

                    //   res.status(200).json({url:req.url})

                    // console.log("results",result)

                    // const product = new productSchema ({
                    //   productName,
                    //   discription,
                    //   price,
                    //   category,
                    //   images:  result.secure_url
                 
                    // })
                 
                    // await product.save()
                      
                    //   res.json({
                    //        status:'success',
                    //        message:"product created",
                    //        data:product
                    //   })
          // })

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