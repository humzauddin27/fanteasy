import React, { Component } from "react";
import logo from '../../assets/images/loading_image.png';
import "./index.css";

class LoadingSpinner extends Component {
  render() {
    return (
      <img
        className="spinning"
        src={logo}
        alt="Loading..."
      />
    );
  }
}

export default LoadingSpinner;
