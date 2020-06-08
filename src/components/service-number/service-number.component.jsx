import React from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button from "../custom-button/custom-button.component";

import { submitServiceNumberStart } from "../../redux/checkout/checkout.actions";

const ServiceNumber = ({
  transactionId,
  serviceNumber,
  submitServiceNumberStart,
}) => {
  const [serviceNumberValue, setServiceNumberValue] = React.useState(
    serviceNumber
  );

  const handleChange = (event) => {
    const { value } = event.target;

    setServiceNumberValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    submitServiceNumberStart({ transactionId, serviceNumberValue });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Nomor Resi"
          value={serviceNumberValue}
          onChange={handleChange}
          required
        />
        <Button>Submit</Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  submitServiceNumberStart: (data) => dispatch(submitServiceNumberStart(data)),
});

export default connect(null, mapDispatchToProps)(ServiceNumber);
