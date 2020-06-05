import React, { Component } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { fetchProvinceStart } from "../../redux/shipping/shipping.actions";

import { selectProvince } from "../../redux/shipping/shipping.selectors";

import FormInput from "../form-input/form-input.component";
import FormSelect from "../form-select/form-select.component";
import FormTextArea from "../form-text-area/form-text-area.component";

import "./checkout.styles";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      address: "",
      phoneNumber: "",
      courier: "choose",
    };
  }

  componentDidMount() {
    const { fetchProvinceStart } = this.props;

    fetchProvinceStart();
  }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { name, address, phoneNumber, courier } = this.state;

    console.log(this.props.provinceRes);

    return (
      <div>
        <form>
          <FormInput
            name="name"
            type="text"
            handleChange={this.handleChange}
            value={name}
            label="Nama Penerima"
            required
          />
          <FormTextArea
            name="address"
            type="text"
            handleChange={this.handleChange}
            value={address}
            label="Alamat Penerima"
            required
            col={4}
          />
          <FormTextArea
            name="phoneNumber"
            type="text"
            handleChange={this.handleChange}
            value={phoneNumber}
            label="Nomor Telepon Penerima"
            required
          />
          <FormSelect
            value={courier}
            label="Kurir Pengiriman"
            name="courier"
            onChange={this.handleChange}
          >
            <option value="choose">Pilih Kurir</option>
            <option value="choose">JNE</option>
            <option value="choose">JNT</option>
          </FormSelect>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchProvinceStart: () => dispatch(fetchProvinceStart()),
});

const mapStateToProps = createStructuredSelector({
  provinceRes: selectProvince,
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
