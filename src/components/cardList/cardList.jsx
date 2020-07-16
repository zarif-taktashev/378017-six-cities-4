import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";

class CardList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: {}
    };

    this.handleChoosenCard = this.handleChoosenCard.bind(this);
  }

  handleChoosenCard(target) {
    this.setState({active: target});
  }

  render() {
    const offers = this.props.offers;
    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) => {
          return (<Card key={offer.banner}
            offer={offer}
            onCardHandler={this.handleChoosenCard}
          />);
        })}
      </div>
    );
  }
}

CardList.propTypes = {
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

export default CardList;
