const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  //validate the user before we make a user
  console.log(req.body);
  const { error } = await registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if the user is already in the database
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  //hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });

  try {
    const savedUser = await user.save();
    res.send({
      user: user._id
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  //validate the user
  const { error } = await loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exist");

  //if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass) return res.status(400).send("Invalid password");

  res.send("Logged in");
});

module.exports = router;
