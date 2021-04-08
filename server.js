
const express = require('express');
const postToOCR = require("./ocr")

const PORT = 3001;

const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

app.post("/api/ocr", async (req, res) => {
  // console.log(req.body)
  const test = await postToOCR(req.body.url);
  res.status(200).json(test)
  // console.log(results)
})



app.listen(PORT, () => {
  console.log('App is listening on port:', PORT)
})
