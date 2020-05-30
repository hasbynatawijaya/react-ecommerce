import React from "react";

import {
  FormUploadImageContainer,
  FromUploadImage,
} from "./form-upload.styles";

const FormUpload = ({ handleChange, children, imageUrl, ...props }) => {
  return (
    <div>
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
    </div>
  );
};

export default FormUpload;
