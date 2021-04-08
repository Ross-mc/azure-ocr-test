
const express = require('express');
const postToOCR = require("./ocr");
const cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET
}); 


const PORT = 3001;

const app = express();


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

app.post("/api/image", async (req, res) => {
  //we take the base64 string and upload to cloudinary
  cloudinary.uploader.upload(req.body.image,{tags: "test"}, async (err, img) => {
    if (err){
      console.log(err)
    } else {
      // we get the url returned from cloudinary and send to OCR, this takes a few seconds to complete
      const resultFromOcr = await postToOCR(img.url);
      res.status(200).json(resultFromOcr)
    }
  })
})

app.post("/api/ocr", async (req, res) => {

  res.status(200).json("currently  not submitting request to azure")
})



app.listen(PORT, () => {
  console.log('App is listening on port:', PORT)
})
