import React from "react";

import {
  FormUploadImageContainer,
  FromUploadImage,
  FormUploadContainer,
} from "./form-upload.styles";

const FormUpload = ({ handleChange, children, imageUrl, ...props }) => {
  return (
    <FormUploadContainer>
      <FormUploadImageContainer
        onClick={(e) => document.getElementById("hiddenFileInput").click()}
      >
        <FromUploadImage src={imageUrl} />
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
