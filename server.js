
const express = require('express');
const postToOCR = require("./ocr");
const multer = require("multer");
const MulterAzureStorage = require("multer-azure-storage")

//
// var multer = require('multer')
// var MulterAzureStorage = require('multer-azure-storage')
// var upload = multer({
//   storage: new MulterAzureStorage({
//     azureStorageConnectionString: 'https://mystorageaccount.blob.core.windows.net/',
//     azureStorageAccessKey: 'myaccesskey',
//     azureStorageAccount: 'mystorageaccount',
//     containerName: 'photos',
//     containerSecurity: 'blob'
//   })
// })

//

const upload = multer({
  storage: new MulterAzureStorage({
        azureStorageConnectionString: "DefaultEndpointsProtocol=https;AccountName=reducewastestorage;AccountKey=v8KoVU/bxyzlywv1fHmFvsJao/M4RBKbYXBY1L7nsXGeiDx6sVPRFx1TdXVq0UDsoPHQ8H9xSbZqnBgHsKlinQ==;EndpointSuffix=core.windows.net",
    azureStorageAccessKey: 'v8KoVU/bxyzlywv1fHmFvsJao/M4RBKbYXBY1L7nsXGeiDx6sVPRFx1TdXVq0UDsoPHQ8H9xSbZqnBgHsKlinQ==',
    azureStorageAccount: 'reducewastestorage',
    containerName: 'reducewastecontainer'
  })
})


//'https://reducewastestorage.blob.core.windows.net'
const PORT = 3001;

const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

app.post("/api/image", upload.single('file'), async (req, res) => {
  // console.log(req.body)
  console.log(res)
  // console.log(results)
})

app.post("/api/ocr", async (req, res) => {
  // console.log(req.body)
  const test = await postToOCR(req.body.url);
  res.status(200).json(test)
  // console.log(results)
})



app.listen(PORT, () => {
  console.log('App is listening on port:', PORT)
})
