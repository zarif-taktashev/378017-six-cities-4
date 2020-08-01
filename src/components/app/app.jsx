import React from "react";
import PropTypes from "prop-types";
import {MainComponent} from "../main/main.jsx";
import {connect} from 'react-redux';
import {ActionCreator as SiteCreator} from "../../reducer/site/site.js";
import {getTowers, getHotelsByCity} from "../../reducer/data/selectors.js";
import {getActiveCity} from "../../reducer/site/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";

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
  offers: PropTypes.arrayOf(PropTypes.shape({
    bedrooms: PropTypes.number.isRequired,
    city: PropTypes.shape({
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired
      }).isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    description: PropTypes.string.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string).isRequired,
    host: PropTypes.shape({
      avatarUrl: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired
    }).isRequired,
    maxAdults: PropTypes.number.isRequired,
    previewImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired
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
