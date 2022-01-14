const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Tasks = require("../../src/models/task");
const Task = require("../../src/models/task");
const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: "user one",
  email: "userone@example.com",
  password: "userone@15",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const userTwo = {
  name: "user two",
  email: "usertwo@example.com",
  password: "usertwo@15",
  tokens: [],
};

const userThreeId = new mongoose.Types.ObjectId();

const userThree = {
  _id: userThreeId,
  name: "user three",
  email: "userthree@example.com",
  password: "userthree@15",
  tokens: [
    {
      token: jwt.sign({ _id: userThreeId }, process.env.JWT_SECRET),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "First task",
  completed: false,
  owner: userOne._id,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "second task",
  completed: true,
  owner: userOne._id,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Three task",
  completed: false,
  owner: userThree._id,
};

const setUpDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userThree).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  userThree,
  setUpDatabase,
};
