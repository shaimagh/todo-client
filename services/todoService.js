import { useQuery } from 'react-query';

import { getTodos } from './apiService';

export function useTodos() {
  return useQuery('todos', getTodos);
}
