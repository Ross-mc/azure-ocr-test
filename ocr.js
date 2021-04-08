const axios = require("axios");
require("dotenv").config()

const postToOCR = async (binaryImageData) => {
  const results = await axios({
    method: "post",
    url: "https://reducewastereader.cognitiveservices.azure.com/",
    headers: {
      "Content-Type": "application/octet-stream",
      "Prediction-key": process.env.API_KEY
    },
    data: binaryImageData
  })
};

module.exports = postToOCR;