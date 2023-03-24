import axios from 'axios';

let location = {origin:""}

// Create a new axios instance
const instance = axios.create({
  baseURL: location.origin + "/api",

});

// Request interceptor for API calls
instance.interceptors.request.use(
  async config => {
    const accessToken = localStorage.getItem("access-token")
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    Promise.reject(error)
  });

// Response interceptor for API calls
instance.interceptors.response.use((response) => {

  // Return response data to the caller
  return response.data;

}, async function (error) {

  // If the error is due to an expired token
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {

    // // Try to refresh the access token
    // originalRequest._retry = true;
    // const newAccessToken = await refreshAccessToken();

    // // If refreshing the access token was successful, update the headers and reattempt the request
    // if (newAccessToken) {
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken.access_token}`;
    //     return axios(originalRequest);
    // }

  }

  // If we can't handle the error, reject the promise and notify the caller
  return Promise.reject(error);
});

export default instance;
