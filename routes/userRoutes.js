const express = require('express')

const router = express.Router()

const user= require('../controller/userController')

const upload = require('../middlware/fileupload')
const tryCatch = require('../middlware/tryCatch')




router.post('/user/registraion',upload.single('images'),tryCatch(user.userRegistraion))
router.post('/user/login',tryCatch(user.login))
router.post('/user/addtocart',tryCatch(user.addToCart))
router.get('/user/cart/products',tryCatch(user.listCart))
router.post('/user/removefromcart',tryCatch(user.removeItemfromCart))

router.post('/user/addtowishlist',tryCatch(user.addtowishlist))
router.get('/user/wishlist',tryCatch(user.showwishlist))
router.post('/user/wishlistremoveitem',tryCatch(user.removeFromWishlist))
router.get('/user/allusers',tryCatch(user.fetchAllUsers))
router.post('/user/delteleuser',tryCatch(user.deleteUser))

router.post('/user/makepayment',tryCatch(user.makePyment))














module.exports = router;