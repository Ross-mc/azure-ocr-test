import {useState} from "react";

const ImageUpload = () => {

  const uploadImage = () => {
    if (e.target.files && e.target.files.length > 0) {
      const newImagesPromises = []
      for (let i = 0; i < e.target.files.length; i++) {
          newImagesPromises.push(fileToDataUri(e.target.files[i]))
      }
      const newImages = await Promise.all(newImagesPromises)
      setImages([...images, ...newImages])
      // call the API
  }
  }

  return (
    <input type="file" onChange={uploadImage} multiple style={{marginTop: "20px", marginBottom: "20px"}}/>
  )
}

export default ImageUpload