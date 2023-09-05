const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

const routeUser = require("./routes/user");
const routePlay = require("./routes/play");

app.use(routeUser);
app.use(routePlay);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server chess-foot started on port ", process.env.PORT);
});
