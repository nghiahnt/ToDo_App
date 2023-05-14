const pool = require("../config/connectDB");

//create user
async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users ( name, email, password ) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
}

//get all users
async function getAllUser(req, res) {
  try {
    pool.query("SELECT * FROM users", (err, result) => {
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

//get user by id
async function getUserId(req, res) {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.json(user.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
}

//delete user
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json(user.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
}

//update user
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await pool.query(
      "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
      [name, email, password, id]
    );
    res.json(user.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { createUser, getAllUser, getUserId, deleteUser, updateUser };
