require("../src/db/mongoose");
const Task = require("../src/models/task");

/* Old way
Task.findByIdAndDelete("61d95c47caf7e82a8a35c5f1")
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then((count) => {
    console.log(count);
  })
  .catch((error) => {
    console.log(error);
  });
*/

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("61d95c40caf7e82a8a35c5ef")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
