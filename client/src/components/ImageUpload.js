import { useImperativeHandle, useState } from "react";

const ImageUpload = () => {
  const [images, setImages] = useState([]);

  //###############################################################################################

  // create a method of uploading to blob storage, getting the url and then calling the back end with the url

  //###############################################################################################

  // const fileToDataUri = (image) => {
  //   return new Promise((res) => {
  //     const reader = new FileReader();
  //     const { type, name, size } = image;
  //     reader.addEventListener("load", () => {
  //       res({
  //         base64: reader.result,
  //         name: name,
  //         type,
  //         size: size,
  //       });
  //     });
  //     reader.readAsDataURL(image);
  //   });
  // };

  // function makeblob(b64Data, contentType, sliceSize) {
  //   contentType = contentType || "";
  //   sliceSize = sliceSize || 512;

  //   var byteCharacters = atob(b64Data);
  //   var byteArrays = [];

  //   for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  //     var slice = byteCharacters.slice(offset, offset + sliceSize);

  //     var byteNumbers = new Array(slice.length);
  //     for (var i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }

  //     var byteArray = new Uint8Array(byteNumbers);

  //     byteArrays.push(byteArray);
  //   }

  //   var blob = new Blob(byteArrays, { type: contentType });
  //   return blob;
  // }

  // // $("#myImage").change(function () {
  // //   //Load everything in
  // //   var reader = new FileReader();
  // //   var file = this.files[0];
  // //   //  var mb = $(this).serializeObject();
  // //   console.log(file);
  // //   reader.onload = function () {
  // //     var resultData = this.result;

  // //     //     console.log(resultData);

  // //     resultData = resultData.split(",")[1];

  // //     processImage(resultData);
  // //     // processImage(mb);
  // //   };

  // //   reader.readAsDataURL(file);
  // // });

  // const uploadImage = async (e) => {
  //   console.log(e.target.files[0])
  //   var data = new FormData()
  //   data.append('file', e.target.files[0])
  //   console.log(data.entries())
  //   if (e.target.files && e.target.files.length > 0) {
  //     const newImagesPromises = [];
  //     for (let i = 0; i < e.target.files.length; i++) {
  //       newImagesPromises.push(fileToDataUri(e.target.files[i]));
  //     }
  //     const newImages = await Promise.all(newImagesPromises);
  //     setImages([...images, ...newImages]);
  //     const response = await fetch(newImages[0].base64);
  //     const blob = await response.blob();
  //     // const file = new File([blob], "capture.png", {
  //     //   type: "image/png",
  //     // });
  //     // call the API
  //     const data = {
  //       "url": "https://www.patriotsoftware.com/wp-content/uploads/2019/12/invoice-vs.-receipt-image-of-receipt.jpg"
  //     }
  //     fetch(
  //      
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Ocp-Apim-Subscription-Key": 
  //         },
  //         method: "POST",
  //         body: data
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((result) => console.log("im the result", result));
  //   }
  // };

  // // const uploadImage = (e) => {
  // //   console.log('i am in the upload image func')
  // //   const reader = new FileReader();
  // //   reader.onload = function () {
  // //     console.log('i am in the onload func')
  // //     const arrayBuffer = this.result;
  // //     const array = new Uint8Array(arrayBuffer);
  // //     const key = ;
  // //     const uri = ;
  // //     fetch(uri, {
  // //       method: "POST",
  // //       headers: {
  // //         "Content-Type": "application/octet-stream",
  // //
  // //       },
  // //       data: arrayBuffer,
  // //       processData: false
  // //     }).then(res => res.json()).then(res2 => console.log(res2))
  // //   }
  // //   reader.readAsArrayBuffer(this.files[0])
  // // }

  // //#################################################
  // //$(document).ready(function () {

  // //Step 1. Hook into the myFile input file change event

  // //    var subKey = '[your key]';

  // //     function makeblob(b64Data, contentType, sliceSize) {
  // //         contentType = contentType || '';
  // //         sliceSize = sliceSize || 512;

  // //         var byteCharacters = atob(b64Data);
  // //         var byteArrays = [];

  // //         for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  // //             var slice = byteCharacters.slice(offset, offset + sliceSize);

  // //             var byteNumbers = new Array(slice.length);
  // //             for (var i = 0; i < slice.length; i++) {
  // //                 byteNumbers[i] = slice.charCodeAt(i);
  // //             }

  // //             var byteArray = new Uint8Array(byteNumbers);

  // //             byteArrays.push(byteArray);
  // //         }

  // //         var blob = new Blob(byteArrays, { type: contentType });
  // //         return blob;
  // //     }

  // //     processImage = function(binaryImage) {

  // //      //   var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";
  // //         var uriBase = "https://eastus.api.cognitive.microsoft.com/vision/v1.0/analyze";

  // //         //    // Request parameters.
  // //         var params = {
  // //             "visualFeatures": "Categories,Description,Color",
  // //             "details": "",
  // //             "language": "en",
  // //         };

  // //         $.ajax({
  // //             url: "https://eastus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories&language=en",

  // //            method: "POST",
  // //            type: "POST",
  // //             beforeSend: function (xhrObj) {
  // //                 xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subKey);

  // //             },
  // //             contentType: "application/octet-stream",
  // //             mime: "application/octet-stream",
  // //             data: makeblob(binaryImage, 'image/jpeg'),
  // //             cache: false,
  // //             processData: false

  // //         }) .done(function(data) {
  // //    // Show formatted JSON on webpage.
  // //    $("#responseTextArea").val(JSON.stringify(data, null, 2));
  // // })

  // //     }
  // // });

  // //#################################################

  const uploadImage = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // const newImagesPromises = [];
      // for (let i = 0; i < e.target.files.length; i++) {
      //   newImagesPromises.push(fileToDataUri(e.target.files[i]));
      // }
      // const newImages = await Promise.all(newImagesPromises);
      // console.log("new images", newImages);
      // setImages([
      //   ...images,
      //   ...newImages.filter((image) => image != undefined),
      // ]);
      const data = JSON.stringify({
        url: "https://i2-prod.manchestereveningnews.co.uk/incoming/article19522330.ece/ALTERNATES/s1200/2_CD16940913.jpg"
      })
      fetch("/api/ocr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: data
      }).then(res => res.json()).then(results => console.log(results))
    }
  }
      //   const file = new File([result], "capture.png", {
      //     type: 'image/png'
      // });
      // console.log(file)
      //   const fd = new FormData();
      //   fd.append('image', file);
      //   fetch(, {
      //     // headers: {
      //     //   "Content-Type": "application/json",
      //     // },
      //     method: "POST",
      //     data: fd,
      //     processData: false,
      //     contentType: false
      //   });
      // const reader = new FileReader();
      // reader.addEventListener("loadend", () => {
      //   const formData = new FormData()
      // })
      // })

  // //     //     let reader = new FileReader();

  // //     // reader.addEventListener("loadend", function () {

  // //     //   formData = new FormData();
  // //     //   formData.append("content", reader.result);
  // //     //   fetch("https://wiki.epfl.ch/test.php", { method: 'POST', body: formData });
  // //     //   reader.removeEventListener("loadend");

  // //     // });

  // //     // reader.readAsDataURL(content);

  // //     // .then((res) => res.json())
  // //     // .then((result) => console.log("im the result", result));
  // //   }
  // //   // e.target.value = "";
  // // };

  // // converts image to base64, we call atob to convert base64 to binary
  // // const fileToDataUri = (image) => {
  // //   return new Promise((res) => {
  // //     const reader = new FileReader();
  // //     const { type, name, size } = image;
  // //     reader.addEventListener("load", () => {
  // //       res({
  // //         base64: reader.result,
  // //         name: name,
  // //         type,
  // //         size: size,
  // //       });
  // //     });
  // //     reader.readAsDataURL(image);
  // //   });
  // // };

  // // const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  // //   const byteCharacters = atob(b64Data);
  // //   const byteArrays = [];

  // //   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  // //     const slice = byteCharacters.slice(offset, offset + sliceSize);

  // //     const byteNumbers = new Array(slice.length);
  // //     for (let i = 0; i < slice.length; i++) {
  // //       byteNumbers[i] = slice.charCodeAt(i);
  // //     }

  // //     const byteArray = new Uint8Array(byteNumbers);
  // //     byteArrays.push(byteArray);
  // //   }

  // //   const blob = new Blob(byteArrays, {type: contentType});
  // //   return blob;

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
