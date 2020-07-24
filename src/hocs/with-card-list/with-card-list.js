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
      img: PropTypes.string.isRequired,
      premium: PropTypes.bool.isRequired,
      costs: PropTypes.number.isRequired,
      banner: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
    })).isRequired,
  };

  return WithCardList;
};

export default withCardList;
