const express = require("express");
const router = express.Router();
const passport = require("passport");
const SharedLink = require("../models/SharedLink");

const axios = require("axios");

const youtubeApiKey = "AIzaSyDDS1Xpv7O2R8NI-KqAYrOx4eUHNrQZtaM";

function youtubeParser(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

// create share youtube link
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const videoId = youtubeParser(req.body.url);

      const youtubeData = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${youtubeApiKey}`
      );

      const response = await SharedLink.create({
        ...req.body,
        createdBy: req.user._id,
        title: youtubeData.data.items[0].snippet.title,
        description: youtubeData.data.items[0].snippet.description,
      });
      res.status(200).json({ response });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const response = await SharedLink.find().populate({
      path: "createdBy",
      model: "user",
      select: "username",
    });
    res.status(200).json({ response });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
