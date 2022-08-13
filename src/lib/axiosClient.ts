import axiosBase from 'axios';

export const axios = axiosBase.create({
  baseURL: process.env.PROXY_API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});
