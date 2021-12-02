const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FaceSchema = new Schema({
  IDB1: {
    type: Schema.Types.ObjectId,
    ref: "Body",
    required: true,
  },
  IDB2: {
    type: Schema.Types.ObjectId,
    ref: "Body",
    required: true,
  },
  Name: {
    type: String,
  },
});

module.exports = mongoose.model("Face", FaceSchema);
