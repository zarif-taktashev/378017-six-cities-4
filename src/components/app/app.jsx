import React from "react";
import PropTypes from "prop-types";
import MainComponent from "../main/main-component.jsx";


const App = (props) => {
  const {placesQuantity, offers} = props;
  return (
    <MainComponent placesQuantity={placesQuantity} offers={offers} />
  );
};

App.propTypes = {
  placesQuantity: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(PropTypes.string.isRequired)
};


export default App;
