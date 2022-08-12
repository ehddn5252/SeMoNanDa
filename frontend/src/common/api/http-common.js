import baseAxios from 'axios';

const axios = baseAxios.create({
  baseURL: 'https://i7e103.p.ssafy.io/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


export default axios;
