const user = require("../model/userSchema");
const product = require("../model/productSchema")

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { link } = require("../routes/storeRoutes");
const { json } = require("express");

const userRegistraion = async (req, res) => {
  try {
    //  console.log("req files",req.file)
    const { name, username, phone, email, password, address, location } =
      req.body;

    console.log("req name", name);
    console.log("req files", req.file);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      name: name,
      username: username,
      password: hashedPassword,
      email: email,
      phoneNumber: phone,
      address: address,
      location: location,
      images: req.file,
    });

    //   const {path} = req.file
    //  user.images.push(req.file  )
    console.log("req file", req.file);

    await newUser.save();

    res.status(200).json({
      status: "success",
      message: " user registred successfully",
    });
  } catch (error) {
    res.json({
      status: "failed to register",
      message: error.message,
    });
  }
};
//****************** user login ***************** */

const login = async (req, res) => {
  const { email, password } = req.body;

  const checkUser = await user.findOne({ email: email });
  console.log(checkUser);
  const user_id = checkUser._id;
  console.log(user_id, "----------user id");

  if (!checkUser) {
    return res.status(404).json({
      status: "faliure",
      message: "invalid email",
    });
  }
  if (!bcrypt.compare(password, checkUser.password)) {
    return res.status(404).json({
      status: "faliure",
      message: "invalid password",
    });
  }
  const token = jwt.sign({ email: user.email }, "adarsh");
  res.json({
    status: "success",
    message: "successfully",
    email: email,
    token: token,
    user_id,
  });
};

// ************ add to cart *****************

const addToCart = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    const User = await user.findById(user_id);

    
      if (!User.cart.includes(product_id)) {
        User.cart.push(product_id);
        await User.save();

       return res.json({
          status: 200,
          message: "add to cart successfull",
        });
      } else {

        return res.json({

            status :200,
            message:" product alredy present in cart"
        })
        
      }
    
  } catch (err) {
    res.json({
      message: "failed to addcart",
      error: err,
    });
  }
};

const listCart = async (req,res)=>{
  
    const {id} = req.query

    const User = await user.findById(id)
      
    let items =[]
    if (User.cart.length >0){
    for ( itm of User.cart){
     
    const item = await product.findById(itm)

     items.push(item)
    }

   return res.json({
          status:200,
        message : " prduct listed successfully",
        products:items

    })

    console.log("+++++++++++++++++++ prodcuts array :",items)

  }
  res.json({
    status:404,
  message : " cart is empty",
  

})

}

const removeItemfromCart = async (req,res)=>{

  
  try{
    const { user_id,product_id}=req.body
    console.log("**********user id :",user_id," ----------- product id :",product_id)

  const newuser = await user.findById(user_id)
 const index= newuser.cart.indexOf(product_id)
  if (index === -1) {
    return res.status(404).json({ message: "Product not found in Cart" });
  }

  newuser.cart.splice(index,1)

  await newuser.save()

  
  console.log(" prodcut removed successfully")
  console.log(" ------------- new cart",  newuser.cart)
  res.json({

    status:200,
    cart :  newuser.cart
  })
   
  }
  catch(err){

    console.log(" remove item error",err)
  }


}

module.exports = { userRegistraion, login, addToCart,listCart,removeItemfromCart };
