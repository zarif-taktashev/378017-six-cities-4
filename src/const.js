import PropTypes from "prop-types";

const offerProp = {
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
  offer: PropTypes.shape({
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
  }).isRequired,
  HoverOffer: PropTypes.shape({
    bedrooms: PropTypes.number,
    city: PropTypes.shape({
      location: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        zoom: PropTypes.number
      }),
      name: PropTypes.string
    }),
    description: PropTypes.string,
    goods: PropTypes.arrayOf(PropTypes.string),
    host: PropTypes.shape({
      avatarUrl: PropTypes.string,
      id: PropTypes.number,
      isPro: PropTypes.bool,
      name: PropTypes.string
    }),
    id: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    isFavorite: PropTypes.bool,
    isPremium: PropTypes.bool,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number
    }),
    maxAdults: PropTypes.number,
    previewImage: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string,
  })
};

const userProps = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    isPro: PropTypes.bool,
    name: PropTypes.string,
  }),
};

const reviewProps = {
  review: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({
      avatar: PropTypes.string,
      id: PropTypes.number,
      super: PropTypes.bool,
      name: PropTypes.string
    }),
    rating: PropTypes.number,
    date: PropTypes.string,
    comment: PropTypes.string,
  }),
};

export const ResponseStatus = {
  ERROR: 404,
  SUCCESS: 200,
  NO_ACCESS: 401
};

export const Validation = {
  MAX_LENGTH_REVIEW: 300,
  MIN_LENGTH_REVIEW: 50,
  NO_STAR: 0
};

export const radioStars = {
  "perfect": `5`,
  "good": `4`,
  "not bad": `3`,
  "badly": `2`,
  "terribly": `1`,
};

const AppRoute = {
  LOGIN: `/login`,
  MAIN: `/`,
  OFFER: `/offer`,
  FAVORITES: `/favorites`
};

export const SettingImage = {
  SIZE: 119,
  POSITION: 100
};

const housingType = {
  'apartment': `Apartment`,
  'room': `Private Room`,
  'house': `House`,
  'hotel': `Hotel`
};

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const Slicer = {
  OFFERS: 3,
  REVIEWS: 10
};

const cutReviews = (reviews) => {
  return reviews.slice(0, Slicer.REVIEWS);
};

const monthNames = [`January`, `February`, `March`, `April`, `May`, `June`,
  `July`, `August`, `September`, `October`, `November`, `December`
];

const getDate = (date) => {
  const dateNow = new Date(date);
  return `${monthNames[dateNow.getMonth()]} ${dateNow.getFullYear()}`;
};

const SortOffersType = {
  POPULAR: `Popular`,
  PRICE_LOW: `Price: high to low`,
  PRICE_HIGH: `Price: low to high`,
  TOP: `Top rated first`
};

export const sortOffers = (currentOffers, sortType) => {
  switch (sortType) {
    case SortOffersType.PRICE_HIGH:
      return currentOffers.sort((a, b) => a.price - b.price);
    case SortOffersType.PRICE_LOW:
      return currentOffers.sort((a, b) => b.price - a.price);
    case SortOffersType.TOP:
      return currentOffers.sort((a, b) => b.rating - a.rating);
  }

  return currentOffers;
};

export {offerProp, AppRoute, AuthorizationStatus, userProps, housingType, Slicer, cutReviews, getDate, reviewProps, SortOffersType};
