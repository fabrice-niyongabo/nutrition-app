export const returnError = error => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  } else if (error.message) {
    return error.message;
  } else {
    return JSON.stringify(error);
  }
};
