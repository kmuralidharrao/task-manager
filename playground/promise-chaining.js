require("../src/db/mongoose");
const User = require("../src/models/user");

/* Old way
User.findByIdAndUpdate("61d9372c2b2926c2fb372d69", { age: 23 })
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 23 }); // return next promise for chaining purpose
  })
  .then((count) => {
    console.log(count);
  })
  .catch((error) => {
    console.log(error);
  });
*/

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("61d9372c2b2926c2fb372d69", 26)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
