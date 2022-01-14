const express = require("express");
require("./db/mongoose"); //just loading this, so that mongodb connection will happen.

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const maintenance = require("./middleware/maintenance");

const app = express();

//middleware for maintenance mode
app.use(maintenance);

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
