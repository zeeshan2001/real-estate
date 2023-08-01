require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const propertyRoutes = require("./routes/property");
const stickynoteRoutes = require("./routes/stickynotes");

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(express.json()); // It's important to use this line to be able parse incoming request bodies

app.use("/api/auth", authRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/stickynotes", stickynoteRoutes);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
