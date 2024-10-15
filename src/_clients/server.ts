'use server';

import axios from 'axios';
// eslint-disable-next-line import/no-cycle

const defaultOptions = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URI,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: process.env.API_SECRET_KEY,
  },
};

const server = axios.create(defaultOptions);

server.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response.data)
);

export default server;
