const productSchema = require("../model/productSchema")

 const cloudinary = require('../Cloudinary/cloudinary')

const fs = require('fs')




const addproduct = async (req,res)=>

     {
          let urls= []

        try{
               const {productName,discription,price,category} = req.body
                 console.log("product name",productName)


                 const uploader = async ( path)=> await cloudinary.uploads(path,'images')
                 if ( req.method == "POST"){

                    
                    const files = req.files
                    
                    for ( const file of files ){
                         
                         const { path } = file
                         console.log("paths",path)
                         
                       const newPath = await uploader(path)
                         console.log("new path :",newPath)
                         
                         urls.push(newPath)
                         
                         fs.unlinkSync(path)
                    }

                    
               

                    const product = new productSchema ({
                      productName,
                      discription,
                      price,
                      category,
                      images:  urls
                 
                    })
                 
                    await product.save()
                      
                      res.json({
                         message : "image uploaded sussesfull",  
                          urldata:urls,
                           status:'success',
                           message:"product created",
                             data:product
                      })

                    }
               
                    else{
    
                        res.status(400).json({
                             err: " image not uploaded"
                        })
                    }          

   }


          catch(err){

               console.log("error catched",err)
          }
     
}




module.exports ={addproduct}