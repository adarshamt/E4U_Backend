const user = require("../model/userSchema");
const product = require("../model/productSchema");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { link } = require("../routes/storeRoutes");
const { json, response } = require("express");

const Razorpay = require("razorpay");
const crypto = require("crypto");

const userRegistraion = async (req, res) => {
  try {
    //  console.log("req files",req.file)
    const { name, username, phone, email, password, address, location } =
      req.body;

    console.log("req body ----------",req.body   );
    // console.log("req files", req.file);

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
        status: 200,
        message: " product alredy present in cart",
      });
    }
  } catch (err) {
    res.json({
      message: "failed to addcart",
      error: err,
    });
  }
};

// ********************* Cart ******************************

const listCart = async (req, res) => {
  const { id } = req.query;

  if (id) {
    const User = await user.findById(id);

    // const [items, setitems] = useState([])

    let items =[]

    // console.log(" cart value-------------------",User.cart[0])
    if (User.cart.length >= 0) {
      for (itm of User.cart) {
        const item = await product.findById(itm);

        items.push(item);
        // setitems(item)
        
      }

      const totalSum = items.reduce((sum, item) => {
        
        return sum + item.price;
      }, 0);
      

      console.log("++++++++++++total sum+++++++++", totalSum);

      return res.json({
        status: 200,
        message: " prduct listed successfully",
        products: items,
        total: totalSum,
      });

      console.log("+++++++++++++++++++ prodcuts array :", items);
    }
    res.json({
      status: 404,
      message: " cart is empty",
    });
  }
};

const removeItemfromCart = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;
    console.log(
      "**********user id :",
      user_id,
      " ----------- product id :",
      product_id
    );

    const newuser = await user.findById(user_id);
    const index = newuser.cart.indexOf(product_id);
    if (index === -1) {
      return res.status(404).json({ message: "Product not found in Cart" });
    }

    newuser.cart.splice(index, 1);

    await newuser.save();

    console.log(" prodcut removed successfully");
    console.log(" ------------- new cart", newuser.cart);
    res.json({
      status: 200,
      cart: newuser.cart,
    });
  } catch (err) {
    console.log(" remove item error", err);
  }
};

// ***************** add to wishlist *************

const addtowishlist = async (req, res) => {
  const { user_id, product_id } = req.body;

  console.log(" user : ", user_id, "product id :", product_id);

  const User = await user.findById(user_id);
  console.log("************ User *******", User);
  if (!User.wishlist.includes(product_id)) {
    User.wishlist.push(product_id);
    await User.save(); // add to set

    return res.json({
      status: 200,
      message: " product added to wishlist",
    });
  } else {
    return res.json({
      status: 200,
      message: " product alredy present in wishlist",
    });
  }
};

// **********show  wish list**********

const showwishlist = async (req, res) => {
  const { user_id } = req.query;

  console.log(" user id ++++++++++++++", user_id);

  try {
    const User = await user.findById(user_id);

    console.log(" ////////////// User //////////////", User);
    const Wishlist = User.wishlist;
    console.log(" +++++++++++++ wishlist ++++++++++", Wishlist);

    console.log("wishlis length _________-----", Wishlist.length);

    let items = [];
    if (Wishlist.length > 0) {
      for (const item of Wishlist) {
        const Product = await product.findById(item);

        items.push(Product);
      }
    }

    res.json({
      status: 200,
      message: "success",
      products: items,
      ids: Wishlist,
    });
  } catch (error) {
    res.json({
      status: 400,
      message: "failiur",
    });
    console.log(" error ", error);
  }
};
// ************Remove from wishlist ****************
const removeFromWishlist = async (req, res) => {
  console.log("------------------REMOVE FROM WISHLIST ------------------");

  const { user_id, product_id } = req.body;

  console.log(" user : ", user_id, "product id :", product_id);

  try {
    const User = await user.findById(user_id);
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User.wishlist ------------------", User.wishlist);

    User.wishlist = User.wishlist.filter((item) => item != product_id);

    await User.save();

    console.log("Updated User:", User);
    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//  **************** fetch all users *****************

const fetchAllUsers = async (req, res) => {
  console.log(" ************** fetch all users **************");

  try {
    const Users = await user.find();

    res.json({
      message: "success",
      Users: Users,
    });
  } catch (error) {
    res.json({
      message: failiur,
    });
    console.log(" error", error);
  }
};

const deleteUser = async (req, res) => {
  console.log("---------------------- delete user ---------------");

  const { user_id } = req.body;

  console.log(" user id ---------", user_id);
  try {
    const Users = await user.findByIdAndDelete(user_id);
    if (!Users) {
      return res.status(404).json({ message: "No Users " });
    }

    res.json({
      status: 200,
      message: "user removed successfully",
    });
  } catch (error) {
    console.log(" error deleting user", error);
  }
};

const payment = async (req, res) => {
  console.log(" key -------------------", process.env.key_secret);

  const instance = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });

  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
  };
  console.log(" options ************************", options);

  instance.orders.create(options, (error, order) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Something Went Wrong!" });
    }
    res.status(200).json({ data: order });
  });
};

const verifyPayment = async (req, res) => {
  console.log("********************* verify payment **********************");

  const User_id = req.params.id;

  console.log(" req id ******************", User_id);

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.key_secret)
    .update(sign.toString())
    .digest("hex");

  if (razorpay_signature === expectedSign) {
    const User = await user.findById(User_id);
    User.order.push(User.cart);
    User.cart = [];
   await User.save();

    res.status(200).json({
      status: "success",
      message: "Payment verified successfully",
      data: razorpay_order_id,
    });
  } else {
    return res.status(400).json({ message: "Invalid signature sent!" });
  }
};

module.exports = {
  userRegistraion,
  login,
  addToCart,
  listCart,
  removeItemfromCart,
  payment,
  addtowishlist,
  showwishlist,
  removeFromWishlist,
  fetchAllUsers,
  deleteUser,
  verifyPayment,
};
