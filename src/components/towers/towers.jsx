import React from "react";
import PropTypes from "prop-types";

const Tower = (props) => {
  const {towers, onSelectCity, activeCity} = props;

  return (
    <ul onClick={(evt) => {
      onSelectCity(evt.target.innerText);
    }} className="locations__list tabs__list">
      {towers.map((item, index) => {
        let className = `locations__item-link tabs__item`;

        if (item === activeCity) {
          className += ` tabs__item--active`;
        }

        return (
          <li key={index} className="locations__item">
            <a className={className} href="#">
              <span>{item}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

Tower.propTypes = {
  towers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onSelectCity: PropTypes.func.isRequired,
  activeCity: PropTypes.string.isRequired
};

export default Tower;
