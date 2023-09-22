

const express = require('express')

const router =express.Router()

const {storeRegistration,storeslist,storeLogin}= require( "../controller/storeController.js")
const upload = require("../middlware/fileupload.js")





router.post("/store/registraion",upload.single('images'),storeRegistration)
router.post("/store/login",storeLogin)
router.get("/stores/list",storeslist)




module.exports =router