const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    productName :'String',
    discription:'String',
    price:'Number',
    category:'String',
    Quantity:'String',
    id:'String',
    images:[{}]


})


const product = mongoose.model("product",productSchema)
module.exports = product