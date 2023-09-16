
const express = require('express')

const router =express.Router()
const {addproduct, viewProduct, viewStoreProducts} = require("../controller/productController")
const upload = require("../middlware/fileupload.js")




const {products} = require('../controller/productController')

router.post("/store/addproduct",upload.array('images',5),addproduct)

router.get('/products',products)
router.get('/product/view/:id',viewProduct)
router.get('/store/products',viewStoreProducts)


module.exports =router