import React, {PureComponent} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import ReviewsList from "../reviews-list/reviews-list.jsx";
import CardList from "../cardList/cardList.jsx";
import ErrorMessage from "../error-message/error-message.jsx";
import withCardList from "../../hocs/with-card-list/with-card-list";
import Header from '../header/header.jsx';
import Map from "../map/map.jsx";
import withReviewForm from '../../hocs/with-review-form/with-review-form';
import ReviewForm from '../review-form/review-form.jsx';
import {userProps, AppRoute, housingType, offerProp, reviewProps} from "../../const.js";
import {getUser} from "../../reducer/user/selectors.js";
import {getHoverOffer} from "../../reducer/site/selectors.js";
import {getHotels, getReviews, getNearOffers, getBlocking} from "../../reducer/data/selectors.js";
import {Operations as DataOperation} from "../../reducer/data/data.js";
import {ActionCreator as SiteCreator} from "../../reducer/site/site.js";

const WithCardList = withCardList(CardList);
const ReviewFormWrapper = withReviewForm(ReviewForm);
const maxImg = 6;

class Property extends PureComponent {
  constructor(props) {
    super(props);
    this.newNearOffers = [];
  }

  render() {
    this.foundOffer = this.props.offers.find((item) => item.id === Number(this.props.openedOfferId));
    const {title, images, isPremium, isFavorite, id, rating, type, bedrooms, maxAdults, price, goods, host, description} = this.foundOffer ? this.foundOffer : {};
    const cutImages = images ? images.slice(0, maxImg) : [];
    if (this.foundOffer && this.props.nearOffers.length === 0) {
      this.props.onTitleClick(this.foundOffer);
    }

    if (this.props.nearOffers.length) {
      const newOff = this.props.nearOffers.slice();
      newOff.push(this.foundOffer);
      this.newNearOffers = newOff;
    }
    return (
      this.foundOffer ? <div className="page">
        <Header
          onMainHandler={this.props.onMainHandler}
          user={this.props.user}
        />
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {cutImages.map((photo, i) =>{
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
                {isPremium && <div className="property__mark">
                  <span>Premium</span>
                </div>}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {title}
                  </h1>
                  <Link className={`property__bookmark-button ${isFavorite ? `property__bookmark-button--active` : ``} button`}
                    to={this.props.user ? {} : AppRoute.LOGIN}
                    onClick={this.props.user ? () => this.props.onFavoriteOfferClick(id, isFavorite) : null}
                  >
                    <svg className="place-card__bookmark-icon" width="31" height="33">
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
                    {goods && goods.map((item, i) =>
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
                    <div className={`property__avatar-wrapper ${host && host.isPro ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
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
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{this.props.reviews.length}</span></h2>
                  {!!this.props.reviews.length && <ReviewsList reviews={this.props.reviews} />}
                  {!!this.props.user &&
                      <ReviewFormWrapper
                        offer={this.foundOffer}
                        onReviewSubmit={this.props.onReviewSubmit}
                        messageServer={this.props.messageServer}
                        isBlocked={this.props.isBlocked}
                      />
                  }
                </section>
              </div>
            </div>
            <section className="property__map map">
              {!!this.props.nearOffers.length && <Map offers={this.newNearOffers} />}
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                {!!this.props.nearOffers.length && <WithCardList user={this.props.user} onCardHover={this.props.onCardHover} onTitleClick={this.props.onTitleClick} onFavoriteOfferClick={this.props.onFavoriteOfferClick} offers={this.props.nearOffers} />}
              </div>
            </section>
          </div>
          {!!this.props.loginError && <ErrorMessage
            loginError={this.props.loginError}
          />}
          {!!this.props.messageServer && this.props.messageServer.status !== 200 ? <ErrorMessage
            loginError={this.props.messageServer.data.error}
          /> : ``}
        </main>
      </div> : null
    );
  }
}

Property.propTypes = {
  openedOfferId: PropTypes.string.isRequired,
  onMainHandler: PropTypes.func.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onFavoriteOfferClick: PropTypes.func.isRequired,
  user: userProps.user,
  loginError: PropTypes.string,
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
  offers: offerProp.offers
};

const mapStateToProps = (state) => {
  return {
    offers: getHotels(state),
    nearOffers: getNearOffers(state),
    hoverOffer: getHoverOffer(state),
    user: getUser(state),
    isBlocked: getBlocking(state),
    reviews: getReviews(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onReviewSubmit(id, review) {
    dispatch(DataOperation.sendReview(id, review));
  },
  onTitleClick(offer) {
    dispatch(DataOperation.loadNearOffers(offer.id))
      .then(() => dispatch(DataOperation.loadReviews(offer.id)));
  },
  onCardHover(offer) {
    dispatch(SiteCreator.setHoverOffer(offer));
  },
});

export {Property};

export default connect(mapStateToProps, mapDispatchToProps)(Property);
