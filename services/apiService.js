import axios from 'axios';
import Router from 'next/router';

const httpClient = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL });

httpClient.interceptors.request.use(function (config) {
  config.headers.authorization = localStorage.getItem('token');

  return config;
});

httpClient.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (error.response.status === 401) {
      await Router.push('/login');
    }
  }
);

export async function login(data) {
  const result = await httpClient.post('auth/login', data);

  return result?.data;
}

export async function getTodos() {
  const result = await httpClient.get('todos');

  return result?.data;
}
