import * as React from "react";
import PropTypes from "prop-types";

const errorMessageStyle = {
  position: `fixed`,
  top: 0,
  right: 0,
  left: 0,
  width: `200px`,
  margin: `auto`,
  padding: `10px 20px`,
  textAlign: `center`,
  backgroundColor: `red`,
  color: `white`,
};

const ErrorMessage = (props) => {
  const {loginError} = props;

  if (loginError) {
    return (
      <div style={errorMessageStyle}>
        {loginError}
      </div>
    );
  } else {
    return null;
  }
};

ErrorMessage.propTypes = {
  loginError: PropTypes.string.isRequired
};

export default ErrorMessage;
