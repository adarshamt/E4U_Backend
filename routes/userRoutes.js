const express = require('express')

const router = express.Router()

const user= require('../controller/userController')

const upload = require('../middlware/fileupload')




router.post('/user/registraion',upload.single('images'),user.userRegistraion)
router.post('/user/login',user.login)














module.exports = router;