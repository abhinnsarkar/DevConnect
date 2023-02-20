const express = require("express");

const connectDB = require("./config/db");

const app = express();

connectDB();

// init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

// define routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/users", require("./routes/api/users"));

// const PORT = process.env.PORT || 4000;
const PORT = 4000;
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));