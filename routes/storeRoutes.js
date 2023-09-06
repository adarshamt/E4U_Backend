

const express = require('express')

const router =express.Router()

const {storeRegistration}= require( "../controller/storeController.js")
const upload = require("../middlware/fileupload.js")





router.post("/store/registraion",upload.single('images'),storeRegistration)



module.exports =router