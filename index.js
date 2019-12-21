const express = require("express");

const app = express();

//Import routes
const authRoute = require("./routes/auth");

//route middlewares
app.use("/api/user", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is Up and running on PORT ${PORT}`));
