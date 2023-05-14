const express = require("express");
const session = require("express-session");
const cors = require("cors");

const bodyParser = require("body-parser");
const pool = require("./config/connectDB");
const route = require("./routers/web_routes");
const auth = require("./services/middleware");

const port = process.env.PORT || 5000;
const app = express();

// session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, maxAge: 1200000 },
  })
);

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//use modules
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

//web route
app.use(route);
app.use(auth);

//connect DB
pool.connect((err) => {
  if (err) throw err;
});

//run server
app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);
