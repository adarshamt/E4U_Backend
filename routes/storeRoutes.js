

const express = require('express')

const router =express.Router()

const {storeRegistration,storeslist,storeLogin}= require( "../controller/storeController.js")
const upload = require("../middlware/fileupload.js")

const tryCatch = require('../middlware/tryCatch.js')





router.post("/store/registraion",upload.single('images'),tryCatch(storeRegistration))
router.post("/store/login",tryCatch(storeLogin))
router.get("/stores/list",tryCatch(storeslist))




module.exports =router