const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex");
require("dotenv").config();

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: process.env.host,
    port: 5433,
    user: "postgres",
    password: process.env.password,
    database: "smart-brain",
  },
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/signin", signin.handleSignin(db, bcrypt));

//Depency Injection => I'm passing down database and bcrypt
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.listen(8000, () => {
  console.log("app is running on port 8000");
});
