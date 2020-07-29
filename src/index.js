import ReactDOM from "react-dom";
import React from "react";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import App from "./components/app/app.jsx";
import {reducer, ActionCreator, AuthorizationStatus, Operations} from "./reducer.js";
import {createAPI} from "./api.js";

const api = createAPI(() => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
});

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);

store.dispatch(Operations.loadHotels());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
