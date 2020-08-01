import React, {PureComponent} from "react";
import {offerProp} from "../../const";

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
    offers: offerProp.offers
  };

  return WithCardList;
};

export default withCardList;
