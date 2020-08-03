import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import Card from '../card/card.jsx';
import Header from '../header/header.jsx';
import NoFavorites from '../no-favorites/no-favorites.jsx';
import {AppRoute, userProps, offerProp} from "../../const.js";

const Favorites = (props) => {
  const {favoriteHotels, user, onFavoriteOfferClick} = props;
  let cities = new Set();
  favoriteHotels.forEach((hotel) => cities.add(hotel.city.name));
  const sortFavoriteHotels = Array.from(cities).map((item) => {
    return {
      city: item,
      offers: favoriteHotels.filter((hotel) => item === hotel.city.name)
    };
  });

  return (
    <div className="page">
      <Header
        onMainHandler={() => {}}
        user={user}
      />

      {sortFavoriteHotels.length && sortFavoriteHotels[0].offers !== [] ?
        <React.Fragment>
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {sortFavoriteHotels.map((item, i) =>
                    <li className="favorites__locations-items" key={`${item} + ${i}`}>
                      <div className="favorites__locations locations locations--current" >
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{item.city}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {item.offers.map((offer) =>
                          <Card
                            {...props}
                            key={offer.id}
                            offer={offer}
                            user={user}
                            onCardHandler={() => {}}
                            onFavoriteOfferClick={onFavoriteOfferClick}
                          />
                        )}
                      </div>
                    </li>
                  )}
                </ul>
              </section>
            </div>
          </main>
          <footer className="footer container">
            <Link
              className="footer__logo-link"
              to={AppRoute.MAIN}
            >
              <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
            </Link>
          </footer>
        </React.Fragment> : <NoFavorites />}
    </div>
  );
};

Favorites.propTypes = {
  favoriteHotels: offerProp.offers,
  onFavoriteOfferClick: PropTypes.func.isRequired,
  user: userProps.user
};


export default Favorites;
