

const express = require('express')

const router =express.Router()

const {storeRegistration}= require( "../controller/storeController.js")

const {addproduct} = require("../controller/productController")

const upload = require("../middlware/fileupload.js")



router.post("/store/registraion",upload.single('images'),storeRegistration)
router.post("/store/addproduct",upload.array('images',5),addproduct)



module.exports =router