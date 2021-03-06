const axios = require("axios");
require("dotenv").config();
("use strict");

const async = require("async");
const fs = require("fs");
const https = require("https");
const path = require("path");
const createReadStream = require("fs").createReadStream;
const sleep = require("util").promisify(setTimeout);
const ComputerVisionClient = require("@azure/cognitiveservices-computervision")
  .ComputerVisionClient;
const ApiKeyCredentials = require("@azure/ms-rest-js").ApiKeyCredentials;

/**
 * AUTHENTICATE
 * This single client is used for all examples.
 */
 const key = process.env.API_KEY;
 const endpoint =
   "https://reducewastereader.cognitiveservices.azure.com/vision/v3.0/read/analyze";



const timer = ms => new Promise(res => setTimeout(res, ms))//creating a reusable blocking timer that can be used in for/while loops

const postToOCR = async (url) => {
  const data = {
    url:
      url
  };
  const results = await axios({
    method: "post",
    url: endpoint,
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": key,
    },
    data: data,
  });

  //when Azure first returns a success, it is because it has successfully received the image and is now processing it, it provides
  // a url on <variable>.headers["operation-location"] which can be called to get the result
  // this takes some amount of time, a second or two
  
  let realResults = await axios({
      method: "get",
      headers: {
        "Ocp-Apim-Subscription-Key": key,
      },
      url: results.headers["operation-location"],
  });
  //create a function that uses the blocking promise above, and attempts to call endpoint
  //using optional chaining, we determine if a results has been received. if so we break early,
  // or we limit it to 5 requests, some error handling will be required
  async function load () { // We need to wrap the loop into an async function for this to work
    for (var attempts = 0; attempts < 5 && !realResults?.data?.analyzeResult?.readResults[0]?.lines; attempts++) {
      console.log(attempts);
      realResults = await axios({
        method: "get",
        headers: {
          "Ocp-Apim-Subscription-Key": key,
        },
        url: results.headers["operation-location"],
      })
      await timer(3000); // then the created Promise can be awaited
    }
    return (realResults?.data?.analyzeResult?.readResults[0]?.lines || "Error: Could not obtain data from Azure")
  }
  const finalResponseFromAzure = await load();
  return finalResponseFromAzure
  
};








module.exports = postToOCR;
