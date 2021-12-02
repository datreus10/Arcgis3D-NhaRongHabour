const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Column_Cir_DecorationSchema = new Schema({
  IDC: {
    type: Schema.Types.ObjectId,
    ref: "Column",
    required: true,
  },
  IDCID: {
    type: Schema.Types.ObjectId,
    ref: "Circular_Decoration",
    required: true,
  },
});

module.exports = mongoose.model(
  "Column_Cir_Decoration",
  Column_Cir_DecorationSchema
);
