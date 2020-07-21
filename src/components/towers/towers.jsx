import React from "react";
import PropTypes from "prop-types";
import Tower from "../tower/tower.jsx";

const LIST_TAG = `UL`;

const Towers = (props) => {
  const {towers, onSelectCity, activeCity} = props;

  return (
    <ul onClick={(evt) => {
      if (evt.target.tagName !== LIST_TAG) {
        onSelectCity(evt.target.innerText);
      }
    }} className="locations__list tabs__list">
      {towers.map((item, index) => {
        return (
          <Tower key={index} towerInf={item} activeCity={activeCity} />
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
