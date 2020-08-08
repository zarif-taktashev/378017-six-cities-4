import React from "react";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";
import {offerProp, userProps} from "../../const.js";

const CardList = ({offers, onHandleChosenCard, user, onFavoriteOfferClick, onCardHover, onTitleClick}) => {
  return (
    <div className="cities__places-list places__list tabs__content">
      {!!offers.length && offers.map((offer) => {
        return (<Card
          key={offer.id}
          offer={offer}
          onCardHover={onCardHover}
          user={user}
          onTitleClick={onTitleClick}
          onFavoriteOfferClick={onFavoriteOfferClick}
          onCardHandler={onHandleChosenCard}
        />);
      })}
    </div>
  );
};

CardList.propTypes = {
  onHandleChosenCard: PropTypes.func.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func,
  onFavoriteOfferClick: PropTypes.func.isRequired,
  offers: offerProp.offers,
  user: userProps.user
};

export default CardList;
