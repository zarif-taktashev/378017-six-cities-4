import ReactDOM from "react-dom";
import React from "react";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import App from "./components/app/app.jsx";
import {createAPI} from "./api.js";
import reducer from "./reducer/reducer.js";
import {Operations} from "./reducer/data/data.js";
import {AuthorizationStatus, ActionCreator, Operations as UserOperations} from "./reducer/user/user.js";

const api = createAPI(() => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
});

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);

store.dispatch(Operations.loadHotels());
store.dispatch(UserOperations.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
