const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

//Import routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

//Connect to db
const uri = process.env.dbUrl;
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to db!");
  }
);

//Middleware
app.use(express.json());

//Route middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is Up and running on PORT ${PORT}`));
