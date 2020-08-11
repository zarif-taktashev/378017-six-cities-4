import React from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {Switch, Route, Router, Redirect} from "react-router-dom";
import {MainComponent} from "../main/main.jsx";
import {Sign} from "../sign/sign.jsx";
import Property from "../property/property.jsx";
import Favorites from "../favorites/favorites.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import {ActionCreator as SiteCreator} from "../../reducer/site/site.js";
import {getTowers, getHotelsByCity, getFavoriteHotels, getMessageServer} from "../../reducer/data/selectors.js";
import {Operations as DataOperation} from "../../reducer/data/data.js";
import {getActiveCity, getSortType, getHoverOffer} from "../../reducer/site/selectors.js";
import {getAuthorizationStatus, getUser, getLoadingStatus, getLoginError} from "../../reducer/user/selectors.js";
import {Operations as UserOperations} from "../../reducer/user/user.js";
import {offerProp, AppRoute, AuthorizationStatus, userProps} from "../../const.js";
import history from "../../history";

const App = (props) => {
  const {offers, loginError, messageServer, isLoad, onSelectCity, hoverOffer, activeCity, towers, onCardHover, authorizationStatus, onLoginSubmit, user, favoriteHotels, onFavoriteOfferClick, onTitleClick, onSortChange, sortType} = props;
  return (
    <Router
      history={history}
    >
      <Switch>
        <Route path={`/offer/:id`} render={(url) => {
          return (
            <Property
              openedOfferId={url.match.params.id}
              offers={offers}
              messageServer={messageServer}
              loginError={loginError}
              onFavoriteOfferClick={onFavoriteOfferClick}
              onMainHandler={() => {}}
            />);
        }}>
        </Route>
        <Route exact path={AppRoute.MAIN}>
          <MainComponent onMainHandler={() => {}}
            onSelectCity={onSelectCity}
            offers={offers}
            hoverOffer={hoverOffer}
            onCardHover={onCardHover}
            onTitleClick={onTitleClick}
            activeCity={activeCity}
            loginError={loginError}
            messageServer={messageServer}
            onFavoriteOfferClick={onFavoriteOfferClick}
            towers={towers}
            onSortChange={onSortChange}
            sortType={sortType}
            user={user}
          />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          {authorizationStatus === AuthorizationStatus.AUTH ? <Redirect to={AppRoute.MAIN}/>
            :
            <Sign
              onLoginSubmit={onLoginSubmit}
              loginError={loginError}
              user={user}
            />}
        </Route>
        <PrivateRoute exact path={AppRoute.FAVORITES}
          isLoad={isLoad}
          render={() => {
            return (
              <Favorites
                user={user}
                favoriteHotels={favoriteHotels}
                onFavoriteOfferClick={onFavoriteOfferClick}
                onCardHover={onCardHover}
                onTitleClick={onTitleClick}
                messageServer={messageServer}
              />
            );
          }}
        >
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

App.propTypes = {
  onSelectCity: PropTypes.func.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onLoginSubmit: PropTypes.func.isRequired,
  hoverOffer: offerProp.HoverOffer,
  onFavoriteOfferClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  activeCity: PropTypes.string.isRequired,
  towers: PropTypes.arrayOf(PropTypes.string).isRequired,
  offers: offerProp.offers,
  isLoad: PropTypes.bool.isRequired,
  user: userProps.user,
  favoriteHotels: offerProp.offers,
  onSortChange: PropTypes.func.isRequired,
  sortType: PropTypes.string.isRequired,
  loginError: PropTypes.string,
  messageServer: PropTypes.shape({
    status: PropTypes.number,
    data: PropTypes.shape({
      error: PropTypes.string,
    })
  }),
};


const mapStateToProps = (state) => {
  return {
    offers: getHotelsByCity(state),
    messageServer: getMessageServer(state),
    activeCity: getActiveCity(state),
    towers: getTowers(state),
    loginError: getLoginError(state),
    hoverOffer: getHoverOffer(state),
    user: getUser(state),
    isLoad: getLoadingStatus(state),
    favoriteHotels: getFavoriteHotels(state),
    authorizationStatus: getAuthorizationStatus(state),
    sortType: getSortType(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSelectCity: (city) => {
    dispatch(SiteCreator.selectCity(city));
  },
  onTitleClick(offer) {
    dispatch(DataOperation.loadNearOffers(offer.id))
      .then(() => dispatch(DataOperation.loadReviews(offer.id)));
  },
  onCardHover(offer) {
    dispatch(SiteCreator.setHoverOffer(offer));
  },
  onLoginSubmit(login) {
    dispatch(UserOperations.login(login));
  },
  onFavoriteOfferClick(id, isFavorite) {
    dispatch(DataOperation.setFavoriteOffer(id, isFavorite));
  },
  onSortChange(valueType) {
    dispatch(SiteCreator.setSortType(valueType));
  },
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
