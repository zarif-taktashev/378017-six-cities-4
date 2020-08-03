import React from "react";
import PropTypes from "prop-types";
import CardList from "../cardList/cardList.jsx";
import withCardList from "../../hocs/with-card-list/with-card-list";
import Map from "../map/map.jsx";
import Towers from "../towers/towers.jsx";
import Header from "../header/header.jsx";
import {offerProp, userProps} from "../../const.js";

const WithCardList = withCardList(CardList);

const MainComponent = (props) => {
  const {offers, onSelectCity, activeCity, onMainHandler, towers, user, onFavoriteOfferClick} = props;
  const filteredOffers = offers.filter((item) => item.city.name === activeCity);
  return (
    <div className="page page--gray page--main">
      <Header onMainHandler={onMainHandler} user={user} />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            {!!towers && <Towers towers={towers} onSelectCity={onSelectCity} activeCity={activeCity} />}
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filteredOffers.length} places to stay in {activeCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"/>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
                {/* <select className="places__sorting-type" id="places-sorting">
                  <option className="places__option" value="popular" selected="">Popular</option>
                  <option className="places__option" value="to-high">Price: low to high</option>
                  <option className="places__option" value="to-low">Price: high to low</option>
                  <option className="places__option" value="top-rated">Top rated first</option>
                </select> */}
              </form>

              {!!offers.length && <WithCardList user={user} onFavoriteOfferClick={onFavoriteOfferClick} offers={offers} />}
            </section>
            <div className="cities__right-section">
              {!!offers.length && <Map offers={offers}/>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

MainComponent.propTypes = {
  onSelectCity: PropTypes.func.isRequired,
  onMainHandler: PropTypes.func.isRequired,
  activeCity: PropTypes.string.isRequired,
  towers: PropTypes.arrayOf(PropTypes.string).isRequired,
  offers: offerProp.offers,
  onFavoriteOfferClick: PropTypes.func.isRequired,
  user: userProps.user
};

export {MainComponent};
