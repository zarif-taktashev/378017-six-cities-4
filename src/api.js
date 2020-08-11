import axios from "axios";

const Error = {
  UNAUTHORIZED: 401,
  ERROR: 404,
};

export const createAPI = (onUnauthorized, onError) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/six-cities`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (!response) {
      throw err;
    }

    if (response.status === Error.ERROR) {
      onError(response);

      throw err;
    }

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();

      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
