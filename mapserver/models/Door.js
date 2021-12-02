const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoorSchema = new Schema(  {
  IDP: {
    type: Schema.Types.ObjectId,
    ref: "Polygon",
    required: true,
  },
  IDW: {
    type: Schema.Types.ObjectId,
    ref: "Wall",
    required: true,
  },
  Name:{
      type:String
  }
});

module.exports = mongoose.model(
  "Steps",
  DoorSchema
);
