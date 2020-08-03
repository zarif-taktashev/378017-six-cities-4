import ReactDOM from "react-dom";
import React from "react";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import App from "./components/app/app.jsx";
import {createAPI} from "./api.js";
import reducer from "./reducer/reducer.js";
import {Operations, ActionCreator as DataActionCreator} from "./reducer/data/data.js";
import {ActionCreator as SiteActionCreator} from './reducer/site/site';
import {AuthorizationStatus, ActionCreator, Operations as UserOperations} from "./reducer/user/user.js";

const api = createAPI(
    () => {
      store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
    },
    (err) => {
      store.dispatch(DataActionCreator.loadServerMessage(err));
    });

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(Operations.loadHotels())
.then((city) => store.dispatch(SiteActionCreator.selectCity(city)));
store.dispatch(UserOperations.checkAuth())
.then(() => store.dispatch(Operations.loadFavoriteHotels()));

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
