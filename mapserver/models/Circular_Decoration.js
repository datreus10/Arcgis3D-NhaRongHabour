const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Circular_DecorationSchema = new Schema({
  IDP: {
    type: Schema.Types.ObjectId,
    ref: "Polygon",
    required: true,
  },
  IDC: {
    type: Schema.Types.ObjectId,
    ref: "Column",
    required: true,
  },
  Count:{
      type: Int
  },
  Name:{
      type: String
  }
});

module.exports = mongoose.model(
  "Circular_Decoration",
  Circular_DecorationSchema
);
