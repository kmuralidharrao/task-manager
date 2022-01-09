const jwt = require("jsonwebtoken");

const myFunction = async () => {
  const token = jwt.sign({ _id: "1234" }, "thisissecretkey", {
    expiresIn: "10 seconds",
  });
  console.log(token);

  const data = jwt.verify(token, "thisissecretkey");
  console.log(data);
};

myFunction();
