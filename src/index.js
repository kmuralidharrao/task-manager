const express = require("express");
require("./db/mongoose"); //just loading this, so that mongodb connection will happen.

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Task manager server is running in port 3000");
});