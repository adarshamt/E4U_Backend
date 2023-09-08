const store = require('../model/storeSchema')

 const cloudinary = require('../Cloudinary/cloudinary')

const fs = require('fs')




const storeRegistration = async (req,res)=>{


   try{
    const url =[]


     const {storeName,username,phone,email,password,address,location,category}=req.body

     const uploader = async ( path)=> await cloudinary.uploads(path,'images')
     const file = req.file
     console.log("req file",file)

    //  const { path } = file
    //  console.log("path",path)

    //  const newPath = await uploader(path)

    //  console.log("new path :",newPath)
                         
    //  url.push(newPath)
     
    //  fs.unlinkSync(path)


      

    //  const newStore = new store ({ storeName:storeName,username:username,phoneNumber:phone,email:email,
    //   password:password,address:address,location:location,category:category,image:url })

    //  console.log("front req files", req.file)
         


      // await newStore.save()


      // res.status(200).json
      // ({
      //   status :'success',
      //   message:" user registred successfully"

      // })

    


   }

   catch(error)
     {

        res.json({

                status:'failed to register'
             })
      

            console.log("error",error)
     }

}

// **************** Store Login ******************


const storeLogin =()=>{

  const {email,password} = req.body

}


module.exports={storeRegistration}