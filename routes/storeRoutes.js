

const express = require('express')

const router =express.Router()

const {storeRegistration}= require( "../controller/storeController.js")

const {addproduct} = require("../controller/productController")

const upload = require("../middlware/fileupload.js")



router.post("/store/registraion",upload.array('images',5),storeRegistration)
router.post("/store/userowner",addproduct)



module.exports =router