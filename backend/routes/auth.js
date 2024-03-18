const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "yashisgoodboy";
const fetchuser = require('../middleware/fetchuser')


//Route:1 create user 
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //check wether user exixts or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(404)
          .json({ success, error: "User with same email already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken})
      //   console.log(jwtdata);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: "some error has occured" });
    }
});

  //Route: 2 Check Login Credentials
  router.post(
    "/login",
    [
      body("email", "Enter a valid email").isEmail(),
      body("password", "password cannot be blank").exists(),
    ],async (req, res) => {
      let success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //check wether user exixts or not
      const {email, password} = req.body;
      try {
        let user = await User.findOne({email});
        if (!user) {
          success = false;
          return res
            .status(400)
            .json({error: "please try to login with correct credentials" });
        }
        
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
          success = false;
          return res
            .status(400)
            .json({ success, error: "please try to login with correct credentials" });
        }
  
        const data = {
          user: {
            id: user.id,
          },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken})
        //   console.log(jwtdata);
      } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: "Internal server error occured" });
      }
  });


  //Route: 3 Get Loggedin User Details

  router.post(
    "/getuser", fetchuser ,async (req, res) => {
      try {
       const userId = req.user.id
        const user = await User.findById(userId).select("-password");
        res.send(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: "Internal server error occured" });
      }

    });
  

module.exports = router;
