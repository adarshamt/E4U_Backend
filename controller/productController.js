const productSchema = require("../model/productSchema")

// ********** addd product ***********

const addproduct = async (req,res)=>{
     const {productName,discription,price,category} = req.body

     console.log(req.files)
     
//    const images = req.files.map(({path , originalname}) => ({path , originalname}))

   const product = new productSchema ({
     productName,
     discription,
     price,
     category,
     images: req.files

   })

   await product.save()
     
     res.json({
          status:'success',
          message:"product created",
          data:product
     })
}




module.exports ={addproduct}