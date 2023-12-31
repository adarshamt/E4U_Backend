const store = require("../model/storeSchema");

const cloudinary = require("../Cloudinary/cloudinary");

const fs = require("fs");

const jwt = require("jsonwebtoken");

const storeRegistration = async (req, res) => {
  try {
    const url = [];

    const {
      storename,
      username,
      phone,
      email,
      password,
      address,
      location,
      category,
    } = req.body;
    console.log("req body----", req.body);
    const uploader = async (path) => await cloudinary.uploads(path, "images");
    const file = req.file;
    console.log("req file", file);

    const { path } = file;
    console.log("path", path);

    const newPath = await uploader(path);

    console.log("new path :", newPath);

    url.push(newPath);

    fs.unlinkSync(path);
    console.log("url array", url);

    const newStore = new store({
      storeName: storename,
      username: username,
      phoneNumber: phone,
      email: email,
      password: password,
      address: address,
      location: location,
      category: category,
      image: url,
    });

    console.log("newStore", newStore);

    await newStore.save();

    res.status(200).json({
      status: "success",
      message: " Store registred successfully",
    });
  } catch (error) {
    res.json({
      status: "failed to register",
    });

    console.log("error", error);
  }
};

// **************** Store Login ******************

const storeLogin = async (req, res) => {
  const { email, password } = req.body;

  console.log("email :", email, "passsword :", password);

  const checkStore = await store.findOne({ email: email });

  const id = checkStore._id;
  console.log(
    " store check name --------------------  :",
    checkStore.storeName
  );

  if (!checkStore) {
    return res.status(404).json({
      status: "faliure",
      message: "invalid email",
    });
  }
  const token = jwt.sign({ email: store.email }, "adarsh");
  console.log(" token :", token);
  res.json({
    status: "success",
    message: "successfully",
    id,
    token: token,
  });
};
// ******************* Get all the stores ***************

const storeslist = async (req, res) => {
  console.log("************** store list **********************");

  const store_data = await store.find();

  res.json(store_data);
};

// ********************** Delete Store ********************
const deleteStore = async (req, res) => {
  console.log("---------------------- delete user ---------------");

  const {  store_id } = req.body;

  console.log(" store id ---------", store_id);
  try {
    const Stores = await store.findByIdAndDelete(store_id);
    if (!Stores) {
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

module.exports = { storeRegistration, storeLogin, storeslist,deleteStore };
