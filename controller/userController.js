const user = require('../model/userSchema')


const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')



const userRegistraion= async(req,res)=>{
   

    
    try{
        //  console.log("req files",req.file)
    const {name,username,phone,email,password,address,location}=req.body

    console.log("req name",name) 
    console.log("req files",req.file)

    const hashedPassword = await bcrypt.hash(password,10)
    
    
    
    const newUser= new user ({name:name,username:username,password:hashedPassword,email:email,
                               phoneNumber:phone,address:address,location:location,images:req.file})
                                
    //   const {path} = req.file                         
    //  user.images.push(req.file  )
    console.log("req file",req.file)
    
    
    await newUser.save()

    res.status(200).json({
        status :'success',
        message:" user registred successfully"

    })
  
    }

   catch(error){

    res.json({

        status:'failed to register',
        message:error.message
         })
  
     }

} 
//****************** user login ***************** */

const login = async(req,res) =>{
    const {email,password} = req.body

    const chechUser = await user.findOne({email:email})
    console.log(chechUser)

    if(! chechUser){
        return res.status(404).json({
            status:"faliure",
            message:"invalid email",
            
        })
   
    }
   if(!await bcrypt.compare(password,chechUser.password)){

      
    return res.status(404).json({
        status:"faliure",
        message:"invalid password",
        
    })
   }
 const token = jwt.sign({email:user.email},'adarsh')
    res.json({
        
        status:"success",
        message:"successfully",
        email:email,
        token:token
      
   })


}



module.exports={userRegistraion,login}
    