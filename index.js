const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const PORT = 4000;

//import mongoose
const mongoose = require("mongoose");
const app = express("server");

const bookRoute = require("./routers/bookRoute");
const authorRoute = require("./routers/authorRoute");
const userRoute = require("./routers/usersRoute");


const homePage = (req, res) => {
  const homepageFile = path.join(__dirname, "public", "index.html");
  res.sendFile(homepageFile);
};

//middlewares
app.use(bodyparser.json());

app.use(authorRoute);
app.use(bookRoute);
app.use(userRoute);

//get request from html
app.get("/", homePage);

mongoose
  .connect(
    "mongodb+srv://user-123:user-123@lexorg.hkbta.mongodb.net/library?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    app.listen(PORT, () => console.log("server ready on port:" + PORT));
  });
