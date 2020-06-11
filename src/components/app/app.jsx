import React from "react";
import MainComponent from "../main/main-component.jsx";


const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {placesQuantity} = props;
  return (
    <MainComponent placesQuantity={placesQuantity} />
  );
};


export default App;
