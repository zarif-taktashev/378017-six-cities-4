import React from "react";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import {userProps} from "../../const.js";

class Sign extends React.PureComponent {

  constructor(props) {
    super(props);

    this.loginRef = React.createRef();
    this.passwordRef = React.createRef();

    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  onHandleSubmit(evt) {
    const {onLoginSubmit} = this.props;

    evt.preventDefault();

    onLoginSubmit({
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    });
  }

  render() {
    return (
      <div className="page page--gray page--login">
        <Header onMainHandler={() => {}} user={this.props.user} />
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" action="#" method="post" onSubmit={this.onHandleSubmit}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input className="login__input form__input" type="email" name="email" ref={this.loginRef} placeholder="Email" required="" />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input className="login__input form__input" type="password" name="password" ref={this.passwordRef} placeholder="Password" required="" />
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

Sign.propTypes = {
  onLoginSubmit: PropTypes.func.isRequired,
  user: userProps.user
};

export {Sign};
