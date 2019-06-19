export const catchError = error =>
  new Promise(resolve => {
    if (error.response) {
      resolve({ error: true, data: error.response.data, status: error.response.status });
    } else {
      resolve({ error: true, data: error, status: error.status });
    }
  });

export const filterResponse = response =>
  new Promise(resolve => {
    if ([200, 201].includes(response.status)) {
      return resolve({ error: false, data: response.data, status: response.status });
    }
    return resolve({ error: true, data: response.data, status: response.status });
  });

export default filterResponse;
