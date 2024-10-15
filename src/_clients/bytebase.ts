import axios from 'axios';
// eslint-disable-next-line import/no-cycle

const defaultOptions = {
  baseURL: process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
};

const bytebase = axios.create(defaultOptions);

bytebase.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response.data)
);

export default bytebase;
