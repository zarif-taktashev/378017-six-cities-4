import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const App = ({placesQuantity, offers}) => (
  <Main onMainHandler={() => {}} placesQuantity={placesQuantity} offers={offers} />
);

App.propTypes = {
  placesQuantity: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string.isRequired,
    premium: PropTypes.bool.isRequired,
    costs: PropTypes.number.isRequired,
    banner: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  })).isRequired
};


export default App;
