import * as React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import ReviewsList from "../reviews-list/reviews-list.jsx";
import CardList from "../cardList/cardList.jsx";
import withCardList from "../../hocs/with-card-list/with-card-list";
import Header from '../header/header.jsx';
import Map from "../map/map.jsx";
import withReviewForm from '../../hocs/with-review-form/with-review-form';
import ReviewForm from '../review-form/review-form.jsx';
import {userProps, AppRoute, housingType, offerProp, reviewProps} from "../../const.js";

const WithCardList = withCardList(CardList);
const ReviewFormWrapper = withReviewForm(ReviewForm);

const Property = (props) => {
  const {title, images, isPremium, isFavorite, id, rating, type, bedrooms, maxAdults, price, goods, host, description} = props.offer;
  return (
    <div className="page">
      <Header
        onMainHandler={props.onMainHandler}
        user={props.user}
      />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((photo, i) =>{
                return (<div
                  key={photo + i}
                  className="property__image-wrapper"
                >
                  <img className="property__image" src={photo} alt={title} />
                </div>);
              })}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium ? <div className="property__mark">
                <span>Premium</span>
              </div> : null}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <Link className={`property__bookmark-button ${isFavorite ? `property__bookmark-button--active` : ``} button`}
                  to={props.user ? {} : AppRoute.LOGIN}
                  onClick={props.user ? () => props.onFavoriteOfferClick(id, isFavorite) : null}
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </Link>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${Math.round(rating) * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">4.8</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {housingType[type]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((item, i) =>
                    <li
                      key={item + i}
                      className="property__inside-item"
                    >
                      {item}
                    </li>
                  )}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${host.isPro ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={`/${host.avatarUrl}`} width="74" height="74" alt={host.name} />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{props.reviews.length}</span></h2>
                {!!props.reviews.length && <ReviewsList reviews={props.reviews} />}
                {!!props.nearOffers.length &&
                    <ReviewFormWrapper
                      offer={props.offer}
                      onReviewSubmit={props.onReviewSubmit}
                      messageServer={props.messageServer}
                      isBlocked={props.isBlocked}
                    />
                }
              </section>
            </div>
          </div>
          <section className="property__map map">
            {!!props.nearOffers.length && <Map offers={props.nearOffers} />}
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {!!props.nearOffers.length && <WithCardList user={props.user} onTitleClick={props.onTitleClick} onFavoriteOfferClick={props.onFavoriteOfferClick} offers={props.nearOffers} />}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

Property.propTypes = {
  onMainHandler: PropTypes.func.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onFavoriteOfferClick: PropTypes.func.isRequired,
  user: userProps.user,
  isBlocked: PropTypes.bool.isRequired,
  onReviewSubmit: PropTypes.func.isRequired,
  nearOffers: offerProp.offers,
  messageServer: PropTypes.shape({
    status: PropTypes.number,
    data: PropTypes.shape({
      error: PropTypes.string,
    })
  }),
  reviews: PropTypes.arrayOf(reviewProps.review).isRequired,
  offer: offerProp.offer
};

export default Property;
