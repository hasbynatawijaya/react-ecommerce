import React from "react";

import {
  GroupContainer,
  FormTextAreaContainer,
  FormTextAreaLabel,
} from "./form-text-area.styles";

const FormInput = ({ handleChange, label, ...props }) => (
  <GroupContainer>
    <FormTextAreaContainer onChange={handleChange} {...props} />
    {label ? (
      <FormTextAreaLabel className={props.value.length ? "shrink" : ""}>
        {label}
      </FormTextAreaLabel>
    ) : null}
  </GroupContainer>
);

export default FormInput;
