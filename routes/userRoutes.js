const express = require('express')

const router = express.Router()

const user= require('../controller/userController')

const upload = require('../middlware/fileupload')




router.post('/user/registraion',upload.single('images'),user.userRegistraion)
router.post('/user/login',user.login)
router.post('/user/addtocart',user.addToCart)
router.get('/user/cart/products',user.listCart)
router.post('/user/removefromcart',user.removeItemfromCart)

router.post('/user/addtowishlist',user.addtowishlist)
router.get('/user/wishlist',user.showwishlist)
router.post('/user/wishlistremoveitem',user.removeFromWishlist)
router.get('/user/allusers',user.fetchAllUsers)

router.post('/user/makepayment',user.makePyment)














module.exports = router;