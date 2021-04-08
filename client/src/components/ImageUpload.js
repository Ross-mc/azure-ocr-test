import { useImperativeHandle, useState } from "react";
// import {BlobService, createBlobService} from "azure-storage"
// import { response } from "express";


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

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  //helper function to convert image to base64
  const fileToDataUri = (image) => {
    return new Promise((res) => {
      const reader = new FileReader();
      const { type, name, size } = image;
      reader.addEventListener("load", () => {
        res({
          base64: reader.result,
          name: name,
          type,
          size: size,
        });
      });
      reader.readAsDataURL(image);
    });
  };



  const uploadImage = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImagesPromises = [];
      for (let i = 0; i < e.target.files.length; i++) {
        newImagesPromises.push(fileToDataUri(e.target.files[i]));
      }
      const newImages = await Promise.all(newImagesPromises);
      //grab all the images, save them to state
      setImages([
        ...images,
        ...newImages.filter((image) => image != undefined),
      ]);
      // send the base 64 encoded string to our api
      fetch("/api/image", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: newImages[0].base64
        })
      }).then(res => res.json()).then(results => console.log(results))
 
    }
  }


  return (
    <input
      type="file"
      onChange={uploadImage}
      multiple
      style={{ marginTop: "20px", marginBottom: "20px" }}
    />
  );
};

export default ImageUpload;
