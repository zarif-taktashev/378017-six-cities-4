import React from "react";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";

const CardList = ({offers, onHandleChosenCard}) => {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => {
        return (<Card
          key={offer.banner}
          offer={offer}
          onCardHandler={onHandleChosenCard}
        />);
      })}
    </div>
  );
};

CardList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string.isRequired,
    premium: PropTypes.bool.isRequired,
    costs: PropTypes.number.isRequired,
    banner: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  })).isRequired,
  onHandleChosenCard: PropTypes.func.isRequired
};

export default CardList;
