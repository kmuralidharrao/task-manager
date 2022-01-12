const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URL
  /*{
  useNewUrlParser: true, no need provide these details in new version mongoose
  useCreateIndex: true,
}*/
);
