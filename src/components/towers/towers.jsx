import React from "react";
import PropTypes from "prop-types";
import Tower from "../tower/tower.jsx";


const Towers = (props) => {
  const {towers, onSelectCity, activeCity} = props;
  return (
    <ul className="locations__list tabs__list">
      {towers.map((item, index) => {
        return (
          <Tower onSelectCity={onSelectCity} key={index} towerInformation={item} activeCity={activeCity} />
        );
      })}
    </ul>
  );
};

Towers.propTypes = {
  towers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onSelectCity: PropTypes.func.isRequired,
  activeCity: PropTypes.string.isRequired
};

export default Towers;
