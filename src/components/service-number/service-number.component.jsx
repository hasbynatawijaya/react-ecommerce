import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import FormInput from "../form-input/form-input.component";
import Button from "../custom-button/custom-button.component";

import { submitServiceNumberStart } from "../../redux/checkout/checkout.actions";

import { selectLoadingCheckoutAction } from "../../redux/checkout/checkout.selectors";

const ServiceNumber = ({
  transactionId,
  serviceNumber,
  submitServiceNumberStart,
  loading,
  filterPayload,
  detail,
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

    submitServiceNumberStart({
      transactionId,
      serviceNumberValue,
      ...filterPayload,
      detail,
    });
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
        <Button>{loading ? "loading" : "Submit"}</Button>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoadingCheckoutAction,
});

const mapDispatchToProps = (dispatch) => ({
  submitServiceNumberStart: (data) => dispatch(submitServiceNumberStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceNumber);
