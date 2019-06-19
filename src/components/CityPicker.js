import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import * as cityApi from '../api/city/city-api';

class CityPicker extends Component {

  static defaultProps = {
    provinceColSize: 4,
    cityColSize: 4,
    districtColSize: 4
  };

  emptyOptions = {
    provinceOptions: [],
    cityOptions: [],
    districtOptions: [],
  }

  state = {
    isLoading: true,
    selectedProvince: "",
    selectedCity: "",
    selectedDistrict: "",
    ...this.emptyOptions
  };

  componentDidMount() {
    this.getProvinceOptions();
  }

  handleChange = (prop) => (value) => {

    const resetedDate = this.getResetedData(prop);

    if (this.props.onChange) {

      const { selectedProvince, selectedCity, selectedDistrict } = this.state;

      const newState = {
        selectedProvince, selectedCity, selectedDistrict, ...resetedDate,
        [prop]: value
      };

      this.props.onChange(newState);
    }

    this.setState({ [prop]: value, ...resetedDate }, this.getSubItems(prop));
  }

  getResetedData = (selectedProp) => {
    switch (selectedProp) {
      case 'selectedProvince':
        return { selectedCity: '', selectedDistrict: '' };
      case 'selectedCity':
        return { selectedDistrict: '' };
      default:
        return;
    }
  }

  getSubItems = (selectedProp) => () => {
    switch (selectedProp) {
      case 'selectedProvince':
        this.getCityOptions();
        break;
      case 'selectedCity':
        this.getDistrictOptions();
        break;
      default:
        break;
    }
  }

  getCityOptions = () => {

    const selectedProvince = this.state.selectedProvince;

    this.setState({ isLoading: true });

    cityApi.getCities(selectedProvince.value).then(r => {

      if (r.error) {
        console.warn(r.data);
        this.setState({ isLoading: false });
        return;
      }

      this.setState({ isLoading: false, cityOptions: this.mapToInputOptions(r.data.data) });
    });
  }

  getDistrictOptions = () => {

    const { selectedProvince, selectedCity } = this.state;

    this.setState({ isLoading: true });

    cityApi.getDistricts(selectedProvince.value, selectedCity.value).then(r => {

      if (r.error) {
        console.warn(r.data);
        this.setState({ isLoading: false });
        return;
      }

      this.setState({ isLoading: false, districtOptions: this.mapToInputOptions(r.data.data) });
    });

  }

  getProvinceOptions = () => {

    this.setState({ isLoading: true });

    cityApi.getProvinces().then(r => {

      this.setState({ isLoading: false, provinceOptions: this.mapToInputOptions(r.data.data) });
    });

  }

  mapToInputOptions = (data) => data.map((x) => ({ label: x.slug, value: x.id }));

  render() {

    const { selectedProvince, selectedCity, selectedDistrict, isLoading,
      provinceOptions, cityOptions, districtOptions } = this.state;

    const { provinceColSize, cityColSize, districtColSize } = this.props;

    return (
      <React.Fragment>
        <div className={`col-${provinceColSize}`}>
          <label>Province</label>
          <Select
            value={selectedProvince}
            onChange={this.handleChange('selectedProvince')}
            options={provinceOptions}
            isDisabled={isLoading}
          />
        </div>
        <div className={`col-${cityColSize}`}>
          <label>City</label>
          <Select
            value={selectedCity}
            onChange={this.handleChange('selectedCity')}
            options={cityOptions}
            isDisabled={isLoading || !selectedProvince}
          />

        </div>
        <div className={`col-${districtColSize}`}>
          <label>District</label>
          <Select
            value={selectedDistrict}
            onChange={this.handleChange('selectedDistrict')}
            options={districtOptions}
            isDisabled={isLoading || !selectedCity}
          />
        </div>

      </React.Fragment>
    );
  }
}

const sizeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

CityPicker.propTypes = {
  cityColSize: PropTypes.oneOf(sizeOptions),
  provinceColSize: PropTypes.oneOf(sizeOptions),
  districtColSize: PropTypes.oneOf(sizeOptions),
};

export default CityPicker;
