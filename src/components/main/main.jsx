import React from "react";
import PropTypes from "prop-types";
import CardList from "../cardList/cardList.jsx";
import withCardList from "../../hocs/with-card-list/with-card-list";
import withSorting from '../../hocs/with-sorting/with-sorting.js';
import Map from "../map/map.jsx";
import Sorting from '../sorting/sorting.jsx';
import ErrorMessage from "../error-message/error-message.jsx";
import Towers from "../towers/towers.jsx";
import Header from "../header/header.jsx";
import MainEmpty from "../main-empty/main-empty.jsx";
import {offerProp, userProps, sortOffers} from "../../const.js";

const WithCardList = withCardList(CardList);
const SortingWrapper = withSorting(Sorting);

const MainComponent = (props) => {
  const {offers, onSelectCity, activeCity, onMainHandler, towers, user, onCardHover, onFavoriteOfferClick, onTitleClick, hoverOffer, sortType, onSortChange} = props;
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
          {offers.length ?
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffers.length} places to stay in {activeCity}</b>
                <SortingWrapper
                  sortType={sortType}
                  onSortChange={onSortChange}
                />
                {!!offers.length && <WithCardList user={user} onCardHover={onCardHover} onTitleClick={onTitleClick} onFavoriteOfferClick={onFavoriteOfferClick} offers={sortOffers(offers, sortType)} />}
              </section>
              <div className="cities__right-section">
                {!!offers.length && <Map offer={hoverOffer} offers={offers}/>}
              </div>
            </div> :
            <MainEmpty
              currentCity={activeCity}
            />
          }
          {!!props.loginError && <ErrorMessage
            loginError={props.loginError}
          />}
          {!!props.messageServer && props.messageServer.status !== 200 ? <ErrorMessage
            loginError={props.messageServer.data.error}
          /> : ``}
        </div>
      </main>
    </div>
  );
};

MainComponent.propTypes = {
  onSelectCity: PropTypes.func.isRequired,
  loginError: PropTypes.string,
  hoverOffer: offerProp.HoverOffer,
  onCardHover: PropTypes.func.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onMainHandler: PropTypes.func.isRequired,
  activeCity: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  sortType: PropTypes.string.isRequired,
  towers: PropTypes.arrayOf(PropTypes.string).isRequired,
  offers: offerProp.offers,
  onFavoriteOfferClick: PropTypes.func.isRequired,
  messageServer: PropTypes.shape({
    status: PropTypes.number,
    data: PropTypes.shape({
      error: PropTypes.string,
    })
  }),
  user: userProps.user
};

export {MainComponent};
