import { useMutation } from 'react-query';

import { login } from './apiService';

export function useLogin() {
  return useMutation('login', login);
}
