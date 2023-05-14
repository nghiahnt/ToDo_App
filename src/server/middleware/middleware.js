const pool = require("../config/connectDB");

// function auth(req, res, next) {
//   if (req.session.user) {
//     next();
//   } else {
//     res.redirect("/");
//   }
// }

async function authSign(req, res, next) {
  const { name, password } = req.body;

  pool.query(
    "SELECT * FROM public.users WHERE name = $1",
    [name],
    (error, result) => {
      if (error) next(error);
      if (password === result.rows[0].password) {
        const user = {
          id: result.rows[0].id,
          name: result.rows[0].name,
        };
        req.session.user = user;
        return res.json(user);
      }
    }
  );
}

function logout(req, res, next) {
  req.session.user = null;
  res.sendStatus(200);
}

module.exports = { authSign, logout };
