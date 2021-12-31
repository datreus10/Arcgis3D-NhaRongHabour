const mongoose = require("mongoose");
require('dotenv').config()

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(`MongoDb connected with host: ${con.connection.host}`);
    })
    .catch((err)=>console.log(err.msg))
};

module.exports = connectDatabase;
