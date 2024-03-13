var express = require("express");
const { firestore } = require("../firebase/firestore");
var router = express.Router();

/* add users listing. */
router.post("/", function (req, res, next) {
  const currentDate = new Date();
  const data = {
    name: req.body.name,
    dateOfBirth: currentDate,
    gender: req.body.gender,
  };
  console.log(data);
  firestore
    .collection("users")
    .add(data)
    .then((docRef) => {
      console.log("Document added with ID:", docRef.id);
      res.send({ message: "respond with a resource", data: docRef });
    })
    .catch((error) => {
      console.error("Error adding document:", error);
    });
});

/* update user  */
router.patch("/:id", function (req, res, next) {
  const userId = req.params.id; // Replace with the actual user ID you want to update

  // Reference the "users" collection and a single document by its ID
  const userRef = firestore.collection("users").doc(userId);

  // Data to update
  const updatedData = {
    name: "John Doe 2",
  };

  // Update the user document
  userRef
    .update(updatedData)
    .then(() => {
      console.log("User updated successfully");
      res.send({ message: "respond with a resource" });
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
});

/* update user  */
router.delete("/:id", function (req, res, next) {
  const userId = req.params.id; // Replace with the actual user ID you want to update

  // Reference the "users" collection and a single document by its ID
  const userRef = firestore.collection("users").doc(userId);

  // Update the user document
  userRef
    .delete()
    .then(() => {
      console.log("User deleted successfully");
      res.send({ message: "respond with a resource" });
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
});

// get user
router.get("/", (req, res, next) => {
  firestore
    .collection("users")
    .get()
    .then((snapshot) => {
      let users = [];
      snapshot.forEach((doc) => {
        let user = doc.data();
        user.id = doc.id;
        users.push(user);
        console.log(doc.id, "=>", doc.data());
      });
      res.status(200).json({ message: "get all users.", data: users });
    })
    .catch((error) => {
      console.error("Error adding document:", error);
      res.status(400).json({ message: "users not found." });
    });
});

// get user by id
router.get("/:id", (req, res, next) => {
  const userRef = firestore.collection("users").doc(req.params.id);

  userRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("User data:", doc.data());
        let user = doc.data();
        user.id = doc.id;
        res.status(200).json({ message: "get user.", data: user });
      } else {
        console.log("No such user with ID:", req.params.id);
        res
          .status(200)
          .json({ message: `No such user with ID : ${req.params.id}` });
      }
    })
    .catch((error) => {
      console.error("Error getting user:", error);
      res.status(400).json({ message: "user not found." });
    });
});

module.exports = router;
