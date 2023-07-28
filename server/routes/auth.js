const express = require("express");
const router = express.Router();
const User = require("../models/User");

//addUser route
router.post("/addUser", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    //TODO: implement hashed password
    user = new User({
      username,
      password,
      role,
    });
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err.message);
    if (err.message) {
      res.status(500).json({ message: err.message });
    }
    res.status(500).json("Server Error");
  }
});

//Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    //TODO: implement hashed password check
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    res.json(user);
  } catch (err) {
    console.log(err.message);
    if (err.message) {
      res.status(500).json({ message: err.message });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
