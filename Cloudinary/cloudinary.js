
const cloudinary = require('cloudinary')

const dotenv = require('dotenv')

dotenv.config()

cloudinary.config({

    cloud_name  : process.env.cloud_name,
      api_key   :process.env.api_key,
      api_secret:process.env.api_secret

})
    

exports.uploads =(file,folder)=>{

    return new Promise(resolve =>{
        cloudinary.uploader.upload(file,(result)=>{
          // console.log("clodinary result",result)
            resolve({
               url:result.url,
                //  id:result.public_id 
                })
            },{

            resourse_type : "auto",
            folder:folder
          })

     })
       
}

