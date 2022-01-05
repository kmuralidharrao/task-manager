// CRUD operations
/*
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
*/
const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";
const id = new ObjectId();

console.log(id);
console.log(id.getTimestamp());
console.log(id.id);
console.log(id.id.length);
console.log(id.toHexString());
console.log(id.toHexString().length);

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }
    console.log("Connected correctly!");

    const db = client.db(databaseName);

    // code for insertOne
    db.collection("users").insertOne(
      {
        _id: id, // optional field if we want to give  our own id
        name: "Muralidhar",
        age: 23,
      },
      (error, result) => {
        if (error) return console.log("Unable to insert user");
        console.log(result);
      }
    );

    // code for insertMany
    db.collection("tasks").insertMany(
      [
        { description: "task1", completed: true },
        { description: "task2", completed: false },
      ],
      (error, result) => {
        if (error) return console.log("Unable to insert many tasks");
        console.log(result);
      }
    );

    // code for findOne
    db.collection("users").findOne(
      {
        _id: new ObjectId("61d53c13992c9204eac80539"),
        //name: "Muralidhar",
        /* can add more fields for making search more specific */
      },
      (error, user) => {
        if (error) return console.log("Error while finding the user");
        console.log(user); //user will null if document is not available
      }
    );

    // code for find - find return a cursor not a callback, so we use toArray() to convert it to array.
    db.collection("users")
      .find({ age: 23 })
      .toArray((error, users) => {
        if (error) return console.log("Error while finding the users");
        console.log(users);
      });

    db.collection("users")
      .find({ age: 23 })
      .count((error, count) => {
        if (error) return console.log("Error while finding the users count");
        console.log(count);
      });

    // code for updateOne
    db.collection("users")
      .updateOne(
        {
          _id: new ObjectId("61d53c13992c9204eac80539"),
        },
        {
          //   $set: {
          //     name: "rao",
          //   },
          $inc: {
            age: 1,
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    // code for updateMany
    db.collection("tasks")
      .updateMany({ completed: false }, { $set: { completed: true } })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    //code for deleteMany
    db.collection("users")
      .deleteMany({ age: 26 })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    //code for deleteOne
    db.collection("tasks")
      .deleteOne({ description: "task2" })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
