import ReactDOM from "react-dom";
import React from "react";
import App from "./components/app/app.jsx";

const Settings = {
  PLACES: 315
};

ReactDOM.render(
    <App placesQuantity={Settings.PLACES} />,
    document.querySelector(`#root`)
);
