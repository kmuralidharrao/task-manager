const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

router.post("/tasks", auth, async (req, res) => {
  //const task = new Task(req.body);
  const task = new Task({ ...req.body, owner: req.user._id });
  /*
    task
      .save()
      .then(() => {
        res.status(201).send(task);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
      */
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

/* optional query parameter 
      -completed : true/false
      -limit : Number
      -skip : Number
      -sortBy: String
*/
router.get("/tasks", auth, async (req, res) => {
  /*
    Task.find({})
      .then((tasks) => {
        res.send(tasks);
      })
      .catch((error) => {
        res.status(500).send();
      });
      */
  try {
    const match = {};
    if (req.query.completed) match.completed = req.query.completed === "true";

    const sort = {};
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1; // 1 for asc and -1 for desc
    }
    //const tasks = await Task.find({});

    // await req.user.populate("tasks");

    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });

    // alternate way
    /*
        const tasks = await Task.find(
          {
            owner: req.user._id,
            completed: req.query.completed,
          },
          null,
          {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
          }
        );
        res.send(tasks);
    */
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  /*
    Task.findById(_id)
      .then((task) => {
        if (!task) return res.status(404).send();
        res.send(task);
      })
      .catch((error) => {
        res.status(500).send();
      });
      */
  try {
    //const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValid = updates.every((update) => allowedUpdates.includes(update));
  if (!isValid) return res.status(400).send({ error: "Invalid Operation" });
  try {
    /*
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    */ // Commenting this out bcz above code will not run middleware of Mongoose.

    // const task = await Task.findById(req.params.id);

    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) return res.status(404).send();

    updates.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();

    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
