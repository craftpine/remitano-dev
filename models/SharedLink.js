const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SharedLinkSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});

module.exports = SharedLink = mongoose.model("sharedLink", SharedLinkSchema);
