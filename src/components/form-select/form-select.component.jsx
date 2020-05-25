import React from "react";

import {
  GroupContainer,
  FormSelectContainer,
  FormSelectLabel,
} from "./form-select.styles";

const FormSelect = ({ handleChange, label, children, ...props }) => (
  <GroupContainer>
    <FormSelectContainer onChange={handleChange} {...props}>
      {children}
    </FormSelectContainer>
    {label ? (
      <FormSelectLabel className={props.value.length ? "shrink" : ""}>
        {label}
      </FormSelectLabel>
    ) : null}
  </GroupContainer>
);

export default FormSelect;
