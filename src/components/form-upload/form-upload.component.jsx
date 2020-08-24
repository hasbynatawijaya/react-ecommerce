import React from "react";

import {
  FormUploadImageContainer,
  FromUploadImage,
  FormUploadContainer,
} from "./form-upload.styles";

const FormUpload = ({ handleChange, children, imageUrl, ...props }) => {
  console.log(imageUrl);
  return (
    <FormUploadContainer>
      <FormUploadImageContainer
        onClick={(e) => document.getElementById("hiddenFileInput").click()}
      >
        {imageUrl ? (
          <FromUploadImage src={imageUrl} />
        ) : (
          <h4>Klik disini untuk menambahkan gambar</h4>
        )}
      </FormUploadImageContainer>
      <input
        type="file"
        id="hiddenFileInput"
        style={{ display: "none" }}
        {...props}
      />
    </FormUploadContainer>
  );
};

export default FormUpload;
