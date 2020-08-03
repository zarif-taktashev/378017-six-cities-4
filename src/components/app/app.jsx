import React from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {Switch, Route, Router, Redirect} from "react-router-dom";
import {MainComponent} from "../main/main.jsx";
import {Sign} from "../sign/sign.jsx";
import Favorites from "../favorites/favorites.jsx";
import {ActionCreator as SiteCreator} from "../../reducer/site/site.js";
import {getTowers, getHotelsByCity, getFavoriteHotels} from "../../reducer/data/selectors.js";
import {Operations as DataOperation} from "../../reducer/data/data.js";
import {getActiveCity} from "../../reducer/site/selectors.js";
import {getAuthorizationStatus, getUser} from "../../reducer/user/selectors.js";
import {Operations as UserOperations} from "../../reducer/user/user.js";
import {offerProp, AppRoute, AuthorizationStatus, userProps} from "../../const.js";
import history from "../../history";

const App = (props) => {
  const {offers, onSelectCity, activeCity, towers, authorizationStatus, onLoginSubmit, user, favoriteHotels, onFavoriteOfferClick} = props;
  return (
    <Router
      history={history}
    >
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <MainComponent onMainHandler={() => {}}
            onSelectCity={onSelectCity}
            offers={offers}
            activeCity={activeCity}
            onFavoriteOfferClick={onFavoriteOfferClick}
            towers={towers}
            user={user}
          />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          {authorizationStatus === AuthorizationStatus.AUTH ? <Redirect to={AppRoute.MAIN}/>
            :
            <Sign
              onLoginSubmit={onLoginSubmit}
              user={user}
            />}
        </Route>
        <Route exact path={AppRoute.FAVORITES}>
          <Favorites
            user={user}
            favoriteHotels={favoriteHotels}
            onFavoriteOfferClick={onFavoriteOfferClick}
          />
        </Route>
      </Switch>
    </Router>
  );
};

App.propTypes = {
  onSelectCity: PropTypes.func.isRequired,
  onLoginSubmit: PropTypes.func.isRequired,
  onFavoriteOfferClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  activeCity: PropTypes.string.isRequired,
  towers: PropTypes.arrayOf(PropTypes.string).isRequired,
  offers: offerProp.offers,
  user: userProps.user,
  favoriteHotels: offerProp.offers
};


const mapStateToProps = (state) => {
  return {
    offers: getHotelsByCity(state),
    activeCity: getActiveCity(state),
    towers: getTowers(state),
    user: getUser(state),
    favoriteHotels: getFavoriteHotels(state),
    authorizationStatus: getAuthorizationStatus(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSelectCity: (city) => {
    dispatch(SiteCreator.selectCity(city));
  },
  onLoginSubmit(login) {
    dispatch(UserOperations.login(login));
  },
  onFavoriteOfferClick(id, isFavorite) {
    dispatch(DataOperation.setFavoriteOffer(id, isFavorite));
  },
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
