const mongoose = require('mongoose')


const storeSchema =  new mongoose.Schema({

    storeName :'String',
    username:'String',
    category:'String',
    phoneNumber:'Number',
    email:'String',
    password:'String',
    address:'String',
    location:{},
    image:{type:'Array'},
    cart:[{


    }],
    order:[{


    }]

})



const store = mongoose.model("store",storeSchema)
module.exports = store