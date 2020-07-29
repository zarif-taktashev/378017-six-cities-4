import React from "react";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";

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
  })).isRequired,
};

export default CardList;
