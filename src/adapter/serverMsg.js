export const serverMsg = (data) => {
  return {
    status: data.status || data.Code,
    data: {
      error: data.statusText || data.message
    }
  };
};
