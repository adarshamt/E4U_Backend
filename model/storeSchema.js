const mongoose = require('mongoose')


const storeSchema =  new mongoose.Schema({

    storeName :'string',
    username:'string',
    phoneNumber:'Number',
    email:'String',
    password:'String',
    address:'String',
    location:'String',
    cart:[{


    }],
    order:[{


    }]

})



const store = mongoose.model("store",storeSchema)
module.exports = store