import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import {offerProp, AppRoute, userProps} from "../../const.js";

const Card = (props) => {
  const {previewImage, rating, title, type, price, isPremium, id, isFavorite} = props.offer;

  const onCardMouseMove = (evt) => {
    evt.preventDefault();
    props.onCardHover(props.offer);
    props.onCardHandler(props.offer);
  };

  return (
    <article onMouseOver={onCardMouseMove} className="cities__place-card place-card">
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Link className={`place-card__bookmark-button ${isFavorite ? `place-card__bookmark-button--active` : ``} button`}
            to={props.user ? {} : AppRoute.LOGIN}
            onClick={props.user ? () => props.onFavoriteOfferClick(id, isFavorite) : null}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </Link>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: rating * 20 + `%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.OFFER}/${id}`} onClick={() => props.onTitleClick(props.offer)}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};


Card.propTypes = {
  offer: offerProp.offer,
  onTitleClick: PropTypes.func.isRequired,
  onFavoriteOfferClick: PropTypes.func.isRequired,
  onCardHandler: PropTypes.func,
  onCardHover: PropTypes.func,
  user: userProps.user
};

export default Card;
