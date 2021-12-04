const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FenceSchema = new Schema({
  IDP: {
    type: Schema.Types.ObjectId,
    ref: "Polygon",
  },
  IDFL: {
    type: Schema.Types.ObjectId,
    ref: "Floor",
  },
  Count_CrossBar:{
      type: Number
  },
  Count_Jamb:{
    type: Number
  },
  Name:{
      type:String
  }
});

const Fence = mongoose.model("Fence",FenceSchema,"Fence")
module.exports = {Fence}
