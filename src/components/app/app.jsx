import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const App = ({placesQuantity, offers}) => (
  <Main onMainHandler={() => {}} placesQuantity={placesQuantity} offers={offers} />
);

App.propTypes = {
  placesQuantity: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(PropTypes.string.isRequired)
};


export default App;
