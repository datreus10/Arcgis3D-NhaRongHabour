const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Column_Cir_DecorationSchema = new Schema({
  IDC: {
    type: Schema.Types.ObjectId,
    ref: "Column",
  },
  IDCID: {
    type: Schema.Types.ObjectId,
    ref: "Circular_Decoration",
  },
});

const Column_Cir_Decoration = mongoose.model("Column_Cir_Decoration",Column_Cir_DecorationSchema,"Column_Cir_Decoration")
module.exports = {Column_Cir_Decoration}
