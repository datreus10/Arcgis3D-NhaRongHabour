const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Column_FenceSchema = new Schema({
  IDC: {
    type: Schema.Types.ObjectId,
    ref: "Column",
  },
  IDFE: {
    type: Schema.Types.ObjectId,
    ref: "Fence",
  },
});

const Column_Fence = mongoose.model("Column_Fence",Column_FenceSchema,"Column_Fence")
module.exports = {Column_Fence}