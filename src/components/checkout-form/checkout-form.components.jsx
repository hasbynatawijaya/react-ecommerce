import React, { Component } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  fetchProvinceStart,
  fetchCityStart,
  fetchShippingCostStart,
} from "../../redux/shipping/shipping.actions";

import {
  selectProvince,
  selectCity,
  selectShippingCost,
} from "../../redux/shipping/shipping.selectors";

import FormInput from "../form-input/form-input.component";
import FormSelect from "../form-select/form-select.component";
import FormTextArea from "../form-text-area/form-text-area.component";

import { CheckoutFormContainer } from "./checkout.styles";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      address: "",
      phoneNumber: "",
      courier: "choose",
      province: "choose",
      city: "choose",
      shippingPackage: "choose-0",
    };
  }

  componentDidMount() {
    const { fetchProvinceStart } = this.props;

    fetchProvinceStart();
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    const { fetchCityStart, fetchShippingCostStart, totalWeight } = this.props;
    const { city, courier } = this.state;

    if (name === "province") {
      fetchCityStart(value);
    } else if (name === "city") {
      fetchShippingCostStart({
        origin: "79",
        destination: value,
        weight: totalWeight,
        courier: courier,
      });
    } else if (name === "courier") {
      fetchShippingCostStart({
        origin: "79",
        destination: city,
        weight: totalWeight,
        courier: value,
      });
    }

    this.setState({ [name]: value });
  };

  render() {
    const {
      name,
      address,
      phoneNumber,
      courier,
      province,
      city,
      shippingPackage,
    } = this.state;
    const { provinceRes, cityRes, shippingCost, totalPrice } = this.props;

    return (
      <CheckoutFormContainer>
        <form>
          <FormInput
            name="name"
            type="text"
            handleChange={this.handleChange}
            value={name}
            label="Nama Penerima"
            required
          />
          <FormInput
            name="phoneNumber"
            type="text"
            handleChange={this.handleChange}
            value={phoneNumber}
            label="Nomor Telepon Penerima"
            required
          />
          <FormTextArea
            name="address"
            type="text"
            handleChange={this.handleChange}
            value={address}
            label="Alamat Penerima"
            required
            rows={4}
          />
          <FormSelect
            value={province}
            label="Provinsi"
            name="province"
            onChange={this.handleChange}
          >
            <option value="choose">Pilih Provinsi</option>
            {provinceRes.map(({ province, province_id }) => (
              <option value={province_id}>{province}</option>
            ))}
          </FormSelect>
          <FormSelect
            value={city}
            label="Kota / Kabupaten"
            name="city"
            onChange={this.handleChange}
          >
            <option value="choose">Pilih Kota / Kabupaten</option>
            {cityRes.map(({ city_id, city_name, type }) => (
              <option value={city_id}>
                {city_name} - {type}
              </option>
            ))}
          </FormSelect>
          <FormSelect
            value={courier}
            label="Kurir Pengiriman"
            name="courier"
            onChange={this.handleChange}
          >
            <option value="choose">Pilih Kurir</option>
            <option value="jne">JNE</option>
            <option value="pos">POS Indonesia</option>
            <option value="tiki">TIKI</option>
          </FormSelect>
          <FormSelect
            value={shippingPackage}
            label="Paket Pengiriman"
            name="shippingPackage"
            onChange={this.handleChange}
          >
            <option value="choose-0">Pilih paket pengiriman</option>
            {shippingCost.map(({ service, description, cost }, i) => (
              <option value={`${service}-${cost[0].value}`}>
                {service} - {description} : Rp.{cost[0].value}
              </option>
            ))}
          </FormSelect>
          <p>
            Total Price {totalPrice + parseFloat(shippingPackage.split("-")[1])}
          </p>
        </form>
      </CheckoutFormContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchProvinceStart: () => dispatch(fetchProvinceStart()),
  fetchCityStart: (provinceId) => dispatch(fetchCityStart(provinceId)),
  fetchShippingCostStart: (data) => dispatch(fetchShippingCostStart(data)),
});

const mapStateToProps = createStructuredSelector({
  provinceRes: selectProvince,
  cityRes: selectCity,
  shippingCost: selectShippingCost,
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
