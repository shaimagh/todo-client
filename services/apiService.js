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
    } else {
      return Promise.reject(error);
    }
  }
);

export async function login(data) {
  const result = await httpClient.post('auth/login', data);

  return result?.data;
}

export async function register(data) {
  const result = await httpClient.post('auth/register', data);

  return result?.data;
}

export async function getTodos() {
  const result = await httpClient.get('todos');

  return result?.data;
}

export async function createTodo(data) {
  const result = await httpClient.post('todos', data);

  return result?.data;
}

export async function updateTodo(id, data) {
  const result = await httpClient.put(`todos/${id}`, data);

  return result?.data;
}

export async function deleteTodo(id) {
  const result = await httpClient.delete(`todos/${id}`);

  return result?.data;
}
