import ReactDOM from "react-dom";
import React from "react";
import App from "./components/app/app.jsx";

const Settings = {
  PLACES: 315
};

const offers = [
  `Beautiful &amp; luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`,
  `Wood and stone place`,
];

ReactDOM.render(
    <App placesQuantity={Settings.PLACES} offers={offers} />,
    document.querySelector(`#root`)
);
