const mongoose= require('mongoose')

const userSchema = new mongoose.Schema({

    name:'String',
    username:'String',
    phoneNumber:'Number',
    email:'String',
    password:'String',
    address:'String',
    location:{},
    images:[{}],
    cart:[{


    }],
    order:[{


    }],
    wishlist:[{

    }]

})

const user= mongoose.model("user",userSchema)
module.exports= user