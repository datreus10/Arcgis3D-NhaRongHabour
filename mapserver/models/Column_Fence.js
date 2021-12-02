const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Column_FenceSchema = new Schema({
  IDC: {
    type: Schema.Types.ObjectId,
    ref: "Column",
    required: true,
  },
  IDFE: {
    type: Schema.Types.ObjectId,
    ref: "Fence",
    required: true,
  },
});

module.exports = mongoose.model(
  "Column_Fence",
  Column_FenceSchema
);
