const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NodeFaceSchema = new Schema({
  IDN: {
    type: Schema.Types.ObjectId,
    ref: "Node",
    required: true,
  },
  IDF: {
    type: Schema.Types.ObjectId,
    ref: "Face",
    required: true,
  },
});

module.exports = mongoose.model("NodeFace", NodeFaceSchema);
