const express = require('express')

const router =express.Router()
const tryCatch = require('../middlware/tryCatch')

const { admin_login} = require('../controller/admineController')



router.post("/admin/login",tryCatch(admin_login))



module.exports =router