const productSchema = require("../model/productSchema")
const storeSchema = require('../model/storeSchema')


 const cloudinary = require('../Cloudinary/cloudinary')

const fs = require('fs')




const addproduct = async (req,res)=>

     // console.log("req file",typeof (req.file))
     {
          let urls= []

        try{
               const {productName,discription,price,category,store_id} = req.body

                console.log("Store id :" ,store_id)

                 console.log("front req files", req.files)



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
                      store_id,
                      images:  urls
                 
                    })
                 
                    await product.save()
                      
                      res.json({
                         message : "image uploaded sussesfull",  
                          
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


// *************** get the product data ***************

const products = async(req,res) =>{

  console.log("product ")
  const all_data = await productSchema.find()
    //  const {category,discription,price,productName,_id,images}=all_data

    //  const res_data ={
    //   category,
    //   discription,
    //   price,
    //   productName,
    //   _id,
    //   image:images[0].url
      


   res.json({
    data:all_data
   })


}

const viewProduct = async (req,res)=>{

  const id= req.params.id
  console.log(" id :",id)

   
  const product = await productSchema.findById(id)

  console.log("----------- product",product)

  res.json({

     message:' successs',
     data:product,
    
     image:product.images[0]

  })

  console.log('selected product :',product)
}

// **********get single store products*********

const viewStoreProducts = async (req,res)=>{
const {id} = req.query

console.log(" store id :",id)

const product = await productSchema.find({store_id:id})
const store = await storeSchema.findById(id)


console.log(" store products :", product[0])

res.json({

  message:"success",
  store:store,
  data:product
})


}


module.exports ={addproduct,products,viewProduct,viewStoreProducts}