import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import {userProps, AppRoute} from "../../const.js";

const Header = (props) => {
  const {onMainHandler, user} = props;

  return (
    <header onClick={onMainHandler} className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to={user ? AppRoute.FAVORITES : AppRoute.LOGIN}>
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">{user ? user.mail : `Sign in`}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onMainHandler: PropTypes.func.isRequired,
  user: userProps.user,
};

export default Header;
