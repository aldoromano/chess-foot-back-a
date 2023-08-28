const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

const routeAgency = require("./routes/agency");
const routeOffer = require("./routes/offer");
const routeReservation = require("./routes/reservation");

app.use(routeAgency);
app.use(routeOffer);
app.use(routeReservation);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server Happy Cow started on port ", process.env.PORT);
});
