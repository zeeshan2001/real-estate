const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Get all users, route /api/users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

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

//Update user route, route: /api/users/update
router.put("/update", async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData?._id) {
      const updatedUser = await User.findByIdAndUpdate(
        updateData._id,
        updateData,
        {
          new: true,
        }
      );
      res.json(updatedUser);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete user, route /api/users/delete/:id
router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await User.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "User deleted successfully!",
      id: id,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
