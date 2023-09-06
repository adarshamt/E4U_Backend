const store = require('../model/storeSchema')



const storeRegistration = async (req,res)=>{


   try{


     const {storeName,username,phone,email,password,address,location}=req.body

      

     const newStore = new store ({ storeName:storeName,username:username,phoneNumber:phone,email:email,password:password,address:address,location:location })
      await newStore.save()


      res.status(200).json
      ({
        status :'success',
        message:" user registred successfully"

      })

     const body =
      { 
        storeName,
        username,
        phone,
        email,
        password,
        address,        
        location
    }


   }

   catch(error)
     {

        res.json({

                status:'failed to register'
             })
      

            console.log("error",error)
     }

}


const storeLogin =()=>{

  const {email,password} = req.body

}


module.exports={storeRegistration}