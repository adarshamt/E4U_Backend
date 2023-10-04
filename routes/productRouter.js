
const express = require('express')

const router =express.Router()
const {addproduct, viewProduct, viewStoreProducts, removeproduct} = require("../controller/productController")
const upload = require("../middlware/fileupload.js")
const tryCatch = require('../middlware/tryCatch')




const {products} = require('../controller/productController')

router.post("/store/addproduct",upload.array('images',5),tryCatch(addproduct))
router.post("/removeproduct",tryCatch(removeproduct))

router.get('/products',tryCatch(products))
router.get('/product/view/:id',tryCatch(viewProduct))
router.get('/store/products',tryCatch(viewStoreProducts))


module.exports =router