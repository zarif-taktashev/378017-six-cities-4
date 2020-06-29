import ReactDOM from "react-dom";
import React from "react";
import App from "./components/app/app.jsx";
import offers from "./mocks/offers.js";

const Settings = {
  PLACES: 315
};

ReactDOM.render(
    <App placesQuantity={Settings.PLACES} offers={offers} />,
    document.querySelector(`#root`)
);
