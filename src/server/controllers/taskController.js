const pool = require("../config/connectDB");

async function createTodo(req, res) {
  try {
    const { user_id, title, description, start, date_end } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO tasks ( user_id, title, description, start, date_end ) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user_id, title, description, start, date_end]
    );
    res.json(newTodo.rows[0]);
    console.log(req.body);
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllTodo(req, res) {
  try {
    pool.query("SELECT * FROM tasks", (err, result) => {
      if (err) {
        console.log(err.message);
      } else {
        res.json(result.rows);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function getTodoIdByUser(req, res) {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [id]);
    res.json(todo.rows);
  } catch (error) {
    console.log(error.message);
  }
}

async function updateTodo(req, res) {
  try {
    const { user_id, title, description, start, date_end } = req.body;
    const todo = await pool.query(
      "UPDATE tasks SET user_id = $1, title = $2, description = $3, start = $4, date_end = $5 WHERE id = $6 RETURNING *",
      [user_id, title, description, start, date_end]
    );
    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteTodo(req, res) {
  try {
    const { id } = req.params;
    const todo = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  createTodo,
  getAllTodo,
  getTodoIdByUser,
  updateTodo,
  deleteTodo,
};
