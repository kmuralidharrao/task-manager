const bcrypt = require("bcryptjs");

const myFunction = async () => {
  const password = "Muralidhar@15";
  const hashedPassword = await bcrypt.hash(password, 8);
  console.log(password);
  console.log(hashedPassword);
  const isMatched = await bcrypt.compare("Muralidhar@15", hashedPassword);
  console.log(isMatched);
};

myFunction();
