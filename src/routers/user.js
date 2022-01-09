const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

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
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

/* commenting this out bcz no one user shd be able to see all other users details
router.get("/users", auth, async (req, res) => {
  /*
    User.find({})
      .then((users) => {
        res.send(users);
      })
      .catch((error) => {
        res.status(500).send();
      });
  */ /*
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});
*/

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
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

/* Old code for update user by id (NO LONGER SUPPORTED)
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValid = updates.every((update) => allowedUpdates.includes(update));
  if (!isValid) return res.status(400).send({ error: "Invalid Operation" });
  try {
    /*
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    */ /*//Commenting this out bcz above code will not run middleware of Mongoose.

    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).send();

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
*/

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValid = updates.every((update) => allowedUpdates.includes(update));
  if (!isValid) return res.status(400).send({ error: "Invalid Operation" });
  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save();

    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

/* Old delete endpoint 
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
*/
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
