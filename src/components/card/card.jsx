import React from "react";
import PropTypes from "prop-types";

const Card = (props) => {
  const {img, rate, banner, type, costs, premium} = props.offer;

  const onCardMouseMove = (evt) => {
    evt.preventDefault();
    props.onCardHandler(props.offer);
  };

  return (
    <article onMouseOver={onCardMouseMove} className="cities__place-card place-card">
      {premium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={img} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{costs}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: rate + `%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{banner}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};


Card.propTypes = {
  offer: PropTypes.shape({
    img: PropTypes.string.isRequired,
    premium: PropTypes.bool.isRequired,
    costs: PropTypes.number.isRequired,
    banner: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  }).isRequired,
  onCardHandler: PropTypes.func.isRequired
};

export default Card;
