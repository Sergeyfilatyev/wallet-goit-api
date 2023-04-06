const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const transactionsRouter = require("./routes/api/transactionsRouter");
const usersRoutes = require("./routes/api/usersRoutes");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));


app.use("/api/transactions", transactionsRouter);

app.use("/api/users", usersRoutes);


app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
  next();
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  console.log(err);
  res.status(status).json({ status, message });
});

module.exports = app;
