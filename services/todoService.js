import { useMutation, useQuery } from 'react-query';

import { queryClient } from '../queryClient';
import { getTodos, createTodo, updateTodo, deleteTodo } from './apiService';

export function useTodos() {
  return useQuery('todos', getTodos);
}

export function useCreateTodo() {
  return useMutation('createTodo', createTodo, {
    onSuccess: (data) => {
      const todos = queryClient.getQueryData('todos');
      todos.unshift(data);
      queryClient.setQueryData('todos', todos);
    }
  });
}

export function useUpdateTodo(id) {
  return useMutation('updateTodo', (data) => updateTodo(id, data), {
    onSuccess: (data) => {
      const previousTodos = queryClient.getQueryData('todos');
      const todos = previousTodos.map((todo) => {
        if (todo._id === data._id) return data;

        return todo;
      });

      queryClient.setQueryData('todos', todos);
    }
  });
}

export function useDeleteTodo(id, onCompleted) {
  return useMutation('deleteTodo', () => deleteTodo(id), {
    onSuccess: (data) => {
      const previousTodos = queryClient.getQueryData('todos');

      const todos = previousTodos.filter((todo) => todo._id !== data._id);

      queryClient.setQueryData('todos', todos);
      onCompleted?.();
    }
  });
}
