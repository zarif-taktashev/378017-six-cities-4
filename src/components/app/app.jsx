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
import {getTowers, getHotelsByCity, getFavoriteHotels, getMessageServer, getReviews, getNearOffers, getBlocking} from "../../reducer/data/selectors.js";
import {Operations as DataOperation} from "../../reducer/data/data.js";
import {getActiveCity, getSortType, getHoverOffer} from "../../reducer/site/selectors.js";
import {getAuthorizationStatus, getUser} from "../../reducer/user/selectors.js";
import {Operations as UserOperations} from "../../reducer/user/user.js";
import {offerProp, AppRoute, AuthorizationStatus, userProps, reviewProps} from "../../const.js";
import history from "../../history";

const App = (props) => {
  const {offers, onSelectCity, messageServer, hoverOffer, onReviewSubmit, activeCity, isBlocked, towers, onCardHover, authorizationStatus, onLoginSubmit, user, favoriteHotels, onFavoriteOfferClick, onTitleClick, reviews, nearOffers, onSortChange, sortType} = props;
  return (
    <Router
      history={history}
    >
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <MainComponent onMainHandler={() => {}}
            onSelectCity={onSelectCity}
            offers={offers}
            hoverOffer={hoverOffer}
            onCardHover={onCardHover}
            onTitleClick={onTitleClick}
            activeCity={activeCity}
            onFavoriteOfferClick={onFavoriteOfferClick}
            towers={towers}
            onSortChange={onSortChange}
            sortType={sortType}
            user={user}
          />
        </Route>
        <Route exact={true} path={`${AppRoute.OFFER}/:id`} render={({match}) => {
          const foundOffer = offers.find((item) => item.id === Number(match.params.id));
          return (foundOffer ?
            <Property
              offer={foundOffer}
              nearOffers={nearOffers}
              reviews={reviews}
              onReviewSubmit={onReviewSubmit}
              onMainHandler={() => {}}
              isBlocked={isBlocked}
              onTitleClick={onTitleClick}
              onFavoriteOfferClick={onFavoriteOfferClick}
              messageServer={messageServer}
              user={user}
            /> : null);
        }}/>
        <Route exact path={AppRoute.LOGIN}>
          {authorizationStatus === AuthorizationStatus.AUTH ? <Redirect to={AppRoute.MAIN}/>
            :
            <Sign
              onLoginSubmit={onLoginSubmit}
              user={user}
            />}
        </Route>
        <PrivateRoute exact path={AppRoute.FAVORITES}
          render={() => {
            return (
              <Favorites
                user={user}
                favoriteHotels={favoriteHotels}
                onFavoriteOfferClick={onFavoriteOfferClick}
                onCardHover={onCardHover}
                onTitleClick={onTitleClick}
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
  isBlocked: PropTypes.bool.isRequired,
  onReviewSubmit: PropTypes.func.isRequired,
  onFavoriteOfferClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(reviewProps.review).isRequired,
  activeCity: PropTypes.string.isRequired,
  towers: PropTypes.arrayOf(PropTypes.string).isRequired,
  offers: offerProp.offers,
  nearOffers: offerProp.offers,
  user: userProps.user,
  favoriteHotels: offerProp.offers,
  onSortChange: PropTypes.func.isRequired,
  sortType: PropTypes.string.isRequired,
  messageServer: PropTypes.shape({
    status: PropTypes.number,
    data: PropTypes.shape({
      error: PropTypes.string,
    })
  })
};


const mapStateToProps = (state) => {
  return {
    offers: getHotelsByCity(state),
    nearOffers: getNearOffers(state),
    activeCity: getActiveCity(state),
    towers: getTowers(state),
    hoverOffer: getHoverOffer(state),
    user: getUser(state),
    isBlocked: getBlocking(state),
    messageServer: getMessageServer(state),
    reviews: getReviews(state),
    favoriteHotels: getFavoriteHotels(state),
    authorizationStatus: getAuthorizationStatus(state),
    sortType: getSortType(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSelectCity: (city) => {
    dispatch(SiteCreator.selectCity(city));
  },
  onReviewSubmit(id, review) {
    dispatch(DataOperation.sendReview(id, review));
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
