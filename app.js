const express = require("express");
const cookieparser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const transactionsRouter = require("./routes/api/transactionsRouter");
const usersRoutes = require("./routes/api/usersRoutes");
const { auth } = require("./middlewares");
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const categoriesRouter = require("./routes/api/categoriesRouter");
const statisticsRouter = require("./routes/api/statisticsRouter");
const googleAuthRouter = require("./routes/api/googleAuthRouter");

const corsOptions = {
  origin: ["http://localhost:3000", "https://wallet-goit-fsv.netlify.app"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(logger(formatsLogger));
app.use(cors(corsOptions));
app.use(cookieparser());
app.use(express.json());
app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/transactions", auth, transactionsRouter);

app.use("/api/users", usersRoutes);

app.use("/api/categories", categoriesRouter);

app.use("/api/statistics", statisticsRouter);

app.use("/api/auth", googleAuthRouter);

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
