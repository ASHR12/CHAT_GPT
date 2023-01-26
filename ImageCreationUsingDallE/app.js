require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const helmet = require("helmet");
var cors = require("cors");
var xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const openAiRouter = require("./routes/openAIRoutes");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, //  Limit each IP to 10 requests per `window` (here, per 5 minutes)
  message: {
    msg: "Too many request from this IP, please try again after 15 minutes",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.set("trust proxy", 1);
// start using middle ware.
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(cors());
app.use(xss());
app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/openAI", apiLimiter, openAiRouter);
const port = process.env.PORT || 5000;
app.use(notFound);
app.use(errorHandlerMiddleware);
const start = async () => {
  app.listen(port, () => console.log(`App listening on port ${port}!`));
};
start();
