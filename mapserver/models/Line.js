const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LineSchema = new Schema({
  //C1: chứa 1 mảng gồm id của node
  //   NodeId:[
  //       {
  //         type: Schema.Types.ObjectId,
  //         ref:"Node",
  //         required: true
  //       }
  //   ],
  //C2: chia thành 2 id Node riêng biệt:
  IDN1: {
    type: Schema.Types.ObjectId,
    ref: "Node",
    required: true,
  },
  IDN2: {
    type: Schema.Types.ObjectId,
    ref: "Node",
    required: true,
  },
  Name: {
    type: String,
  },
});

module.exports = mongoose.model("Line", LineSchema);
