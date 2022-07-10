import axios from 'axios';

const httpClient = axios.create({ baseURL: 'http://localhost:5000/' });

export async function login(data) {
  const result = await httpClient.post('auth/login', data);

  return result.data;
}
