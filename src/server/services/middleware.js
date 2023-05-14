const express = require("express");
const { authSign, logout, auth } = require("../middleware/middleware");
const app = express();

app.post("/login", authSign);
app.post("/logout", logout);
// app.get("/*", auth);

module.exports = app;
