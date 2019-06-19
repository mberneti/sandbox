import React, { Component } from 'react';
import CityPicker from '../components/CityPicker';

class HomePage extends Component {

  handleChange = (data) => {
    console.log(data);
  }

  render() {
    return (
      <div className='container'>
        <div className="row">
          <CityPicker provinceColSize={5} cityColSize={3} onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

export default HomePage;