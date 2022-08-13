import axiosBase from 'axios';

export const axios = axiosBase.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});
