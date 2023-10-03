// import express & dotenv
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// const cors = require("cors");

// import route
const newsRoute = require("./routes/news.route");
const categoryRoute = require("./routes/category.route");
const commentRoute = require("./routes/comment.route");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoute");
const errorMiddleware = require("./middlewares/errorMiddleware");

// inisiasi express
const app = express();


dotenv.config();

app.use(cors());

app.use(express.json());
app.use(newsRoute);
app.use(categoryRoute);
app.use(commentRoute);

app.use(authRoutes);
app.use(userRoutes);
app.use(errorMiddleware);

// jalankan server pada port 3001
app.listen(3001, () => {
  console.log("Server berjalan di port 3001");
});

module.exports = app
