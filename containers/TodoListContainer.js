import { TodoList } from '../components';

import { useTodos } from '../services';

export function TodoListContainer() {
  const { data } = useTodos();

  return <TodoList rows={data} />;
}
