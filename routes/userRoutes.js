const express = require('express')

const router = express.Router()

const user= require('../controller/userController')

const upload = require('../middlware/fileupload')



router.post('/user/registraion',upload.array('images',5),user.userRegistraion)
router.post('/user/login',user.login)











module.exports = router;