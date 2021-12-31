const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FloorSchema = new Schema({
  IDP: {
    type: Schema.Types.ObjectId,
    ref: "Polygon",
  },
  Name: {
    type: String,
  },
});


const Floor = mongoose.model("Floor",FloorSchema,"Floor")
module.exports = {Floor}
