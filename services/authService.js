import { useMutation } from 'react-query';

import { login, register } from './apiService';

export function useLogin() {
  return useMutation('login', login);
}

export function useRegister() {
  return useMutation('register', register);
}
