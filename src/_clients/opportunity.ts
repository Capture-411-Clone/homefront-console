import axios from 'axios';

console.log(process.env.NEXT_PUBLIC_OPPORTUNITY_BASE_URL);

const defaultOptions = {
  baseURL: process.env.NEXT_PUBLIC_OPPORTUNITY_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
};

const opportunity = axios.create(defaultOptions);

// Add a response interceptor
opportunity.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response.data)
);

export default opportunity;

export const opportunityNoRefresh = axios.create(defaultOptions);
opportunityNoRefresh.interceptors.response.use(
  (response) => response,
  (error) => {
    // window.location.reload();
    console.log(error);
    return Promise.reject(
      (error.response && error.response.data) || {
        message: 'Something went wrong processing the request. Please Contact Support',
      }
    );
  }
);
