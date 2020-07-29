import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withCardList = (Component) => {
  class WithCardList extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        active: {}
      };

      this.onHandleChosenCard = this.onHandleChosenCard.bind(this);
    }

    onHandleChosenCard(target) {
      this.setState({active: target});
    }

    render() {
      return (
        <Component
          {...this.props}
          onHandleChosenCard={this.onHandleChosenCard}
        />
      );
    }
  }

  WithCardList.propTypes = {
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
    })).isRequired
  };

  return WithCardList;
};

export default withCardList;
