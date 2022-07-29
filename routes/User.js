const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register ==================================
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.username }).then((user) => {
    if (user) {
      return res.status(400).json({ message: "Username already exists !!" });
    } else {
      const newUser = new User({
        ...req.body,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json({ success: true, user }))
            .catch((err) => res.status(400).json({ success: false, err }));
        });
      });
    }
  });
});

// Login =========================
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ errUser: "User not found!!!" });
    }
    bcrypt.compare(password, user.password).then((match) => {
      if (match) {
        const payload = {
          id: user.id,
          username: user.username,
        };
        jwt.sign(
          payload,
          process.env.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) res.json(err);
            res.json({ success: true, token: `Bearer ${token}` });
          }
        );
      } else {
        return res.status(400).json({ errPassword: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
