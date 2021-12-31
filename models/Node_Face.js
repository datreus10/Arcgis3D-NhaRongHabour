const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NodeFaceSchema = new Schema({
  IDN: {
    type: Schema.Types.ObjectId,
    ref: "Node",

  },
  IDF: {
    type: Schema.Types.ObjectId,
    ref: "Face",

  },
});

const Node_Face = mongoose.model("Node_Face",NodeFaceSchema,"Node_Face")
module.exports = {Node_Face}