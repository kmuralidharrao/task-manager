require("../src/db/mongoose");

const Task = require("../src/models/task");
const User = require("../src/models/user");

const main = async () => {
  const task = await Task.findById("61daac5b32216b2ccfb85af5");
  console.log(task);
  await task.populate("owner");
  console.log(task.owner);

  const user = await User.findById("61daabb16cc87b897c001f67");
  await user.populate("tasks");
  console.log(user.tasks);
};

main();
