import React from "react";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";
import {offerProp} from "../../const.js";

const CardList = ({offers, onHandleChosenCard}) => {
  return (
    <div className="cities__places-list places__list tabs__content">
      {!!offers.length && offers.map((offer) => {
        return (<Card
          key={offer.id}
          offer={offer}
          onCardHandler={onHandleChosenCard}
        />);
      })}
    </div>
  );
};

CardList.propTypes = {
  onHandleChosenCard: PropTypes.func.isRequired,
  offers: offerProp.offers
};

export default CardList;
