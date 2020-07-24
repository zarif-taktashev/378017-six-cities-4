import React from "react";
import PropTypes from "prop-types";

const Tower = (props) => {
  const {towerInformation, activeCity, onSelectCity} = props;
  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${towerInformation === activeCity ? `tabs__item--active` : ``}`}
        onClick={ (e) => {
          e.preventDefault();
          onSelectCity(towerInformation);
        }}
        href="#">
        <span>{towerInformation}</span>
      </a>
    </li>
  );
};

Tower.propTypes = {
  towerInformation: PropTypes.string.isRequired,
  activeCity: PropTypes.string.isRequired,
  onSelectCity: PropTypes.func.isRequired
};

export default Tower;
