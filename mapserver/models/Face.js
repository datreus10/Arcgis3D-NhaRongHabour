const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FaceSchema = new Schema({
  IDB1: {
    type: Schema.Types.ObjectId,
    ref: "Body",
  },
  IDB2: {
    type: Schema.Types.ObjectId,
    ref: "Body",
  },
  Name: {
    type: String,
  },
});

const Face = mongoose.model("Face",FaceSchema,"Face")
module.exports = {Face}