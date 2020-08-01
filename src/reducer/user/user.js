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
  user: {}
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_USER: `SET_USER`
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
        }
      })
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      });
  },
  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
    .then((response) => {
      if (response.status === ResponseStatus.SUCCESS) {
        const convertUser = userData(response.data);
        dispatch(ActionCreator.setUser(convertUser));
      }
    })
    .then(() => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
    });
  }
};

export {reducer, ActionType, ActionCreator, AuthorizationStatus, Operations, initialState};
