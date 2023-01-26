const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res, next) => {
  const prompt = req.body.text;
  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    if (response.status === 200) {
      image_url = response.data.data[0].url;
      res.status(StatusCodes.OK).json({ imageUrl: image_url });
    } else {
      throw new CustomError.BadRequestError();
    }
  } catch (err) {
    throw new CustomError.BadRequestError();
  }
};

module.exports = {
  generateImage,
};
