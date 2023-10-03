require("dotenv").config();
const jwt = require("jsonwebtoken");


const admin_login = async (req, res) => {
  console.log("****************** admin login function **************");

  console.log(" req body --------------------", req.body);

  const usrname = process.env.ad_user_name;
  const passwrd = process.env.ad_password;


  console.log(" env user pass", usrname,passwrd )
  const { username, password } = req.body;

  if (username == usrname && password == passwrd) {

    const token = jwt.sign({ username: username }, "adarsh");
    res.status(200).json({
      message: "admin login sucessfull",
      token
    });
  } else {
    res.status(400).json({
      message: " wrong credentials",
    });
  }
};

module.exports = {
  admin_login,
};
