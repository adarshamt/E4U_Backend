const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    productName :'String',
    discription:'String',
    price:'Number',
    category:'String',
    Quantity:'String',
    images:[{}]


})


const produt = mongoose.model("product",productSchema)
module.exports = produt