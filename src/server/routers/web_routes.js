const {
  createUser,
  getAllUser,
  getUserId,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {
  createTodo,
  getAllTodo,
  getTodoIdByUser,
  deleteTodo,
  updateTodo,
} = require("../controllers/taskController");

const express = require("express");
const app = express();

//User
app.get("/users", getAllUser); // get all users
app.post("/users/create", createUser); // create new user
app.get("/users/:id", getUserId); // return each user view
app.put("/users/update/:id", updateUser); // update user
app.delete("/users/:id", deleteUser); // delete user

//Task
app.get("/tasks", getAllTodo); // get all todo
app.post("/tasks/create", createTodo); // create new todo
app.get("/:id", getTodoIdByUser); // return each todo
app.put("/tasks/:id", updateTodo); // update todo
app.delete("/tasks/:id", deleteTodo); // delete todo

module.exports = app;
