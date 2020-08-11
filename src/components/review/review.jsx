import * as React from 'react';
import {getDate, reviewProps} from '../../const';


const Review = ({reviews}) => {

  const date = getDate(reviews.date);
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={reviews.user.avatar} width="54" height="54" alt={reviews.user.name} />
        </div>
        <span className="reviews__user-name">
          {reviews.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${Math.round(reviews.rating) * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {reviews.comment}
        </p>
        <time className="reviews__time" dateTime={date}>{date}</time>
      </div>
    </li>
  );
};

Review.propTypes = {
  reviews: reviewProps.review.isRequired,
};

export default Review;
