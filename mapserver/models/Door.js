const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoorSchema = new Schema(  {
  IDP: {
    type: Schema.Types.ObjectId,
    ref: "Polygon",
  },
  IDW: {
    type: Schema.Types.ObjectId,
    ref: "Wall",
  },
  Name:{
      type:String
  }
});

const Door = mongoose.model("Door",DoorSchema,"Door")
module.exports = {Door}
