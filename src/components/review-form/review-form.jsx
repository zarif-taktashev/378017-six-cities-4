import * as React from 'react';
import PropTypes from "prop-types";
import {radioStars, offerProp} from '../../const';

const ReviewForm = (props) => {
  const {onSubmit, onReviewFormChange, review, rating, isActive, isBlocked} = props;
  const stars = Object.entries(radioStars);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {stars.map(([title, popularity]) => (
          <React.Fragment key={title + popularity}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={popularity}
              id={`${popularity}-stars`}
              type="radio"
              onChange={onReviewFormChange}
              checked={popularity === rating}
              disabled={isBlocked}
            />
            <label htmlFor={`${popularity}-stars`} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>)
        )}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={review}
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={onReviewFormChange}
        disabled={isBlocked}
      ></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isActive || isBlocked}>Submit</button>
      </div>
    </form>
  );
};
ReviewForm.propTypes = {
  offer: offerProp.offer,
  review: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  rating: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isBlocked: PropTypes.bool.isRequired,
  onReviewFormChange: PropTypes.func.isRequired,
  onReviewSubmit: PropTypes.func.isRequired,
  messageServer: PropTypes.shape({
    status: PropTypes.number,
    data: PropTypes.shape({
      error: PropTypes.string,
    })
  }),
};


export default ReviewForm;
