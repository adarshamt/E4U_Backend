const mongoose = require('mongoose')


const storeSchema =  new mongoose.Schema({

    storName :'String',
    username:'String',
    category:'String',
    phoneNumber:'Number',
    email:'String',
    password:'String',
    address:'String',
    location:'String',
    image:{type:'Array'},
    cart:[{


    }],
    order:[{


    }]

})



const store = mongoose.model("store",storeSchema)
module.exports = store