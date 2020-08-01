import React from "react";
import PropTypes from "prop-types";
import {MainComponent} from "../main/main.jsx";
import {connect} from 'react-redux';
import {ActionCreator as SiteCreator} from "../../reducer/site/site.js";
import {getTowers, getHotelsByCity} from "../../reducer/data/selectors.js";
import {getActiveCity} from "../../reducer/site/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {offerProp} from "../../const.js";

const App = (props) => {
  const {offers, onSelectCity, activeCity, towers, authorizationStatus} = props;

  return (
    <MainComponent onMainHandler={() => {}}
      onSelectCity={onSelectCity}
      authorizationStatus={authorizationStatus}
      offers={offers}
      activeCity={activeCity}
      towers={towers}
    />
  );
};

App.propTypes = {
  onSelectCity: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  activeCity: PropTypes.string.isRequired,
  towers: PropTypes.arrayOf(PropTypes.string).isRequired,
  offers: offerProp.offers
};


const mapStateToProps = (state) => {
  return {
    offers: getHotelsByCity(state),
    activeCity: getActiveCity(state),
    towers: getTowers(state),
    authorizationStatus: getAuthorizationStatus(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSelectCity: (city) => {
    dispatch(SiteCreator.selectCity(city));
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
