const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect(
  "mongodb://127.0.0.1:27017/task-manager-api"
  /*{
  useNewUrlParser: true, no need provide these details in new version mongoose
  useCreateIndex: true,
}*/
);

const User = mongoose.model("User", {
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      //custom validator
      if (!validator.isEmail(value)) throw new Error("Email is invalid");
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(value) {
      if (value.includes("password")) throw new Error("invalid password");
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("Age must me positive");
    },
  },
});

const me = new User({
  name: " K Muralidhar Rao ",
  email: " Muralidharraok15@gmail.com",
  password: "muralidhar",
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

const Task = mongoose.model("Task", {
  description: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false },
});

const task = new Task({
  description: "Task 2   ",
  completed: true,
});

task
  .save()
  .then(() => {
    console.log(task);
  })
  .catch((error) => {
    console.log("Error ", error);
  });
