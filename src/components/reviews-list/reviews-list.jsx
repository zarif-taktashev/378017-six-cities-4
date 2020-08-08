import React from "react";
import PropTypes from "prop-types";
import Review from "../review/review.jsx";
import {cutReviews, reviewProps} from "../../const.js";

const ReviewsList = (reviews) => {
  const newReviews = cutReviews(reviews.reviews);
  return (
    <ul className="reviews__list">
      {newReviews.map((review) =>
        <Review
          key={review.id}
          reviews={review}
        />)
      }
    </ul>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(reviewProps.review).isRequired,
};

export default ReviewsList;
