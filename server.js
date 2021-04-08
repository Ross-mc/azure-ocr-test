const express = require('express');
const postToOCR = require("./ocr")
const PORT = 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/ocr", async (req, res) => {
  const results = await postToOCR(req.body);
  console.log(results)
})

app.listen(PORT, () => {
  console.log('App is listening on port:', PORT)
})