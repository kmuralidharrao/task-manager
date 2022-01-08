const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://127.0.0.1:27017/task-manager-api"
  /*{
  useNewUrlParser: true, no need provide these details in new version mongoose
  useCreateIndex: true,
}*/
);
