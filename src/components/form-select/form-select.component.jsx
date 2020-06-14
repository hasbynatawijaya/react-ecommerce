import React from "react";

import {
  GroupContainer,
  FormSelectContainer,
  FormSelectLabel,
} from "./form-select.styles";

const FormSelect = ({
  handleChange,
  label,
  children,
  zeroMargin,
  ...props
}) => (
  <GroupContainer zeroMargin={zeroMargin}>
    <FormSelectContainer zeroMargin={zeroMargin} onChange={handleChange} {...props}>
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
