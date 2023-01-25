const express = require("express");
const openAiRouter = express.Router();
const { generateImage } = require("../controllers/openAIController");

openAiRouter.route("/createImage").post(generateImage);

module.exports = openAiRouter;
