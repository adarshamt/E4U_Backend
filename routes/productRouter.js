
const express = require('express')

const router =express.Router()
const {addproduct} = require("../controller/productController")
const upload = require("../middlware/fileupload.js")




const {products} = require('../controller/productController')

router.post("/store/addproduct",upload.array('images',5),addproduct)

router.get('/products',products)


module.exports =router