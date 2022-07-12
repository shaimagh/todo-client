import axios from 'axios';

const httpClient = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL });

export async function login(data) {
  const result = await httpClient.post('auth/login', data);

  return result.data;
}
