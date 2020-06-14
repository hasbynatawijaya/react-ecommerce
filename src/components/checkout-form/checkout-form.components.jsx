import React, { Component } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import moment from "moment";

import {
  fetchProvinceStart,
  fetchCityStart,
  fetchShippingCostStart,
} from "../../redux/shipping/shipping.actions";

import { checkoutStart } from "../../redux/checkout/checkout.actions";

import {
  selectProvince,
  selectCity,
  selectShippingCost,
} from "../../redux/shipping/shipping.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectLoadingCheckoutAction } from "../../redux/checkout/checkout.selectors";

import FormInput from "../form-input/form-input.component";
import FormSelect from "../form-select/form-select.component";
import FormTextArea from "../form-text-area/form-text-area.component";
import CustomButton from "../custom-button/custom-button.component";

import { CheckoutFormContainer } from "./checkout.styles";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      address: "",
      phoneNumber: "",
      courier: "choose",
      province: "choose-null",
      city: "choose-null",
      shippingPackage: "choose-0",
    };
  }

  componentDidMount() {
    const { fetchProvinceStart } = this.props;
    const createdAt = moment().startOf("day").toString();
    console.log(createdAt);

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

  handleSubmit = (e) => {
    e.preventDefault();

    const createdAt = new Date(moment().startOf("day").toString());
    const expiredAt = new Date(
      moment().add(2, "days").startOf("day").format("DD MMMM YYYY")
    );

    const { checkoutStart, currentUser, totalPrice, items } = this.props;
    const { shippingPackage, province, city } = this.state;

    checkoutStart({
      ...this.state,
      items,
      totalPrice,
      shippingPackageObj: {
        service: shippingPackage.split("-")[0],
        cost: parseInt(shippingPackage.split("-")[1]),
      },
      provinceObj: {
        provinceId: province.split("-")[0],
        province: province.split("-")[1],
      },
      city: {
        cityId: city.split("-")[0],
        city: city.split("-")[1],
      },
      serviceNumber: "",
      status: "process",
      transferPhotoImageUrl: "",
      userId: currentUser.id,
      createdAt,
      expiredAt,
    });
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
    const {
      provinceRes,
      cityRes,
      shippingCost,
      totalPrice,
      loading,
    } = this.props;

    console.log(loading);

    return (
      <CheckoutFormContainer>
        <form onSubmit={this.handleSubmit}>
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
            required
          >
            <option value="choose-null">Pilih Provinsi</option>
            {provinceRes.map(({ province, province_id }) => (
              <option value={`${province_id}-${province}`}>{province}</option>
            ))}
          </FormSelect>
          <FormSelect
            value={city}
            label="Kota / Kabupaten"
            name="city"
            onChange={this.handleChange}
            required
          >
            <option value="choose-null">Pilih Kota / Kabupaten</option>
            {cityRes.map(({ city_id, city_name, type }) => (
              <option value={`${city_id}-${city_name} (${type})`}>
                {city_name} - {type}
              </option>
            ))}
          </FormSelect>
          <FormSelect
            value={courier}
            label="Kurir Pengiriman"
            name="courier"
            onChange={this.handleChange}
            required
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
            required
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
          <CustomButton disabled={loading}>
            {loading ? "loading" : "Pesan"}
          </CustomButton>
        </form>
      </CheckoutFormContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchProvinceStart: () => dispatch(fetchProvinceStart()),
  fetchCityStart: (provinceId) => dispatch(fetchCityStart(provinceId)),
  fetchShippingCostStart: (data) => dispatch(fetchShippingCostStart(data)),
  checkoutStart: (data) => dispatch(checkoutStart(data)),
});

const mapStateToProps = createStructuredSelector({
  provinceRes: selectProvince,
  cityRes: selectCity,
  shippingCost: selectShippingCost,
  currentUser: selectCurrentUser,
  loading: selectLoadingCheckoutAction,
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
