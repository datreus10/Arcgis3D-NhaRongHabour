const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FenceSchema = new Schema({
  IDP: {
    type: Schema.Types.ObjectId,
    ref: "Polygon",
    required: true,
  },
  IDFL: {
    type: Schema.Types.ObjectId,
    ref: "Floor",
    required: true,
  },
  Count_CrossBar:{
      type: Int
  },
  Count_Jamb:{
    type: Int
  },
  Name:{
      type:String
  }
});

module.exports = mongoose.model(
  "Fence",
  FenceSchema
);
