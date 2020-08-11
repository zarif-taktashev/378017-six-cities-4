import {userData} from '../../adapter/user.js';

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

export const ResponseStatus = {
  ERROR: 404,
  SUCCESS: 200,
  NO_ACCESS: 401
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: null,
  loginError: ``,
  isLoad: true
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_USER: `SET_USER`,
  SET_LOGIN_ERROR: `SET_LOGIN_ERROR`,
  CHECK_LOADING: `CHECK_LOADING`
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  setUser: (status) => {
    return {
      type: ActionType.SET_USER,
      payload: status,
    };
  },
  setLoginError: (status) => {
    return {
      type: ActionType.SET_LOGIN_ERROR,
      payload: status,
    };
  },
  checkLoading: (status) => {
    return {
      type: ActionType.CHECK_LOADING,
      payload: status,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });
    case ActionType.SET_USER:
      return Object.assign({}, state, {
        user: action.payload,
      });
    case ActionType.CHECK_LOADING:
      return Object.assign({}, state, {
        isLoad: action.payload,
      });
    case ActionType.SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.payload,
      });
  }

  return state;
};

const Operations = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        if (response.status === ResponseStatus.SUCCESS) {
          const convertUser = userData(response.data);
          dispatch(ActionCreator.setUser(convertUser));
          dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
          dispatch(ActionCreator.checkLoading(false));
        }
      })
      .catch((err) => {
        dispatch(ActionCreator.checkLoading(false));
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
        dispatch(ActionCreator.setLoginError(`You not login`));
        setTimeout(() => {
          dispatch(ActionCreator.setLoginError(``));
        }, 5000);
        throw err;
      });
  },
  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
    .then((response) => {
      if (response.status === ResponseStatus.SUCCESS) {
        const user = userData(response.data);
        dispatch(ActionCreator.setUser(user));
      }
    })
    .then(() => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
    })
    .catch((err) => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
      dispatch(ActionCreator.setLoginError(err.message));
      setTimeout(() => {
        dispatch(ActionCreator.setLoginError(``));
      }, 5000);
      throw err;
    });
  }
};

export {reducer, ActionType, ActionCreator, AuthorizationStatus, Operations, initialState};
