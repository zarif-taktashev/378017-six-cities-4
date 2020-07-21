import React from "react";
import PropTypes from "prop-types";

const Tower = (props) => {
  const {towerInf, activeCity} = props;

  let className = `locations__item-link tabs__item`;

  if (towerInf === activeCity) {
    className += ` tabs__item--active`;
  }

  return (
    <li className="locations__item">
      <a className={className} href="#">
        <span>{towerInf}</span>
      </a>
    </li>
  );
};

Tower.propTypes = {
  towerInf: PropTypes.string.isRequired,
  activeCity: PropTypes.string.isRequired
};

export default Tower;
