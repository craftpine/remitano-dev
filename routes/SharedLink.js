const express = require("express");
const router = express.Router();
const passport = require("passport");
const SharedLink = require("../models/SharedLink");

// create share youtube link
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const response = await SharedLink.create({
        ...req.body,
        createdBy: req.user._id,
      });
      res.status(200).json({ response });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

router.get(
    "/",
    async (req, res) => {
      try {
        const response = await SharedLink.find().populate({
            path: 'createdBy',
            model: "user",
            select: "username"
        });
        res.status(200).json({ response });
      } catch (error) {
        res.status(400).json(error);
      }
    }
  );

module.exports = router;
