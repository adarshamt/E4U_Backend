const user = require('../model/userSchema')


const bcrypt = require('bcrypt')




const userRegistraion= async(req,res)=>{

    try{
    const {name,username,phone,email,password,address,location,images}=req.body
    
    const newUser= new user ({name:name,username:username,password:password,email:email,phoneNumber:phone,address:address,images:images})
    await newUser.save()

    res.status(200).json({
        status :'success',
        message:" user registred successfully"

    })
  
    }

   catch(error){

    res.json({

        status:'failed to register'
         })
  
     }

} 

const login = async(req,res) =>{
    const {email,password} = req.body

    const chechUser = await user.findOne({email:email})

    if(! chechUser){
        return res.status(404).json({
            status:"faliure",
            message:"invalid email",
            
        })
        
    }
    res.json({
        
        status:"success",
        message:"successfully",
        email:email
      
   })


}



module.exports={userRegistraion,login}
    