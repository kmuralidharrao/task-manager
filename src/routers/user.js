const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  /* old way
    user
      .save()
      .then(() => {
        res.status(201).send(user);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
    */
  //code for async await
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users", async (req, res) => {
  /*
    User.find({})
      .then((users) => {
        res.send(users);
      })
      .catch((error) => {
        res.status(500).send();
      });
      */
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  /*
    User.findById(_id)
      .then((user) => {
        if (!user) return res.status(404).send();
        res.send(user);
      })
      .catch((error) => {
        res.status(500).send();
      });
      */
  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValid = updates.every((update) => allowedUpdates.includes(update));
  if (!isValid) return res.status(400).send({ error: "Invalid Operation" });
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) return res.status(404).send();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
