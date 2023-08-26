

const express = require('express')

const router =express.Router()

const {storeRegistration}= require( "../controller/storeController.js")




router.post("/store/registraion",storeRegistration)


module.exports =router