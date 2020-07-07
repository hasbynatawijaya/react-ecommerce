import React, { Component } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import moment from "moment";

import {
  fetchProvinceStart,
  fetchCityStart,
  fetchShippingCostStart,
} from "../../redux/shipping/shipping.actions";

import {
  addUserAddressStart,
  editUserAddressStart,
} from "../../redux/user/user.actions";

import {
  selectProvince,
  selectCity,
  selectShippingCost,
} from "../../redux/shipping/shipping.selectors";

import {
  selectCurrentUser,
  selectLoadingUserAddressAction,
  selectUserAddressById,
} from "../../redux/user/user.selectors";

import FormInput from "../form-input/form-input.component";
import FormSelect from "../form-select/form-select.component";
import FormTextArea from "../form-text-area/form-text-area.component";
import CustomButton from "../custom-button/custom-button.component";

import { Container } from "./edit-address.styles";

class EditAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      address: "",
      phoneNumber: "",
      province: "choose-null",
      city: "choose-null",
    };
  }

  componentDidMount() {
    const { fetchProvinceStart, fetchCityStart, userAddressById } = this.props;
    const createdAt = moment().startOf("day").toString();

    this.setState({
      name: userAddressById.name,
      address: userAddressById.address,
      phoneNumber: userAddressById.phoneNumber,
      province: userAddressById.province,
      city: userAddressById.city,
    });

    fetchProvinceStart();
    fetchCityStart(userAddressById.province);
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    const { fetchCityStart } = this.props;

    if (name === "province") {
      fetchCityStart(value);
    }

    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.editUserAddressStart({
      userId: this.props.currentUser.id,
      address: { id: this.props.userAddressById.id, ...this.state },
    });
  };

  render() {
    const { name, address, phoneNumber, province, city } = this.state;
    const { provinceRes, cityRes, loading } = this.props;

    return (
      <Container>
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
          <CustomButton> {loading ? "Loading" : "Tambah alamat"}</CustomButton>
        </form>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchProvinceStart: () => dispatch(fetchProvinceStart()),
  fetchCityStart: (provinceId) => dispatch(fetchCityStart(provinceId)),
  fetchShippingCostStart: (data) => dispatch(fetchShippingCostStart(data)),
  addUserAddressStart: (data) => dispatch(addUserAddressStart(data)),
  editUserAddressStart: (data) => dispatch(editUserAddressStart(data)),
});

const mapStateToProps = createStructuredSelector({
  provinceRes: selectProvince,
  cityRes: selectCity,
  shippingCost: selectShippingCost,
  currentUser: selectCurrentUser,
  loading: selectLoadingUserAddressAction,
  userAddressById: selectUserAddressById,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAddress);
