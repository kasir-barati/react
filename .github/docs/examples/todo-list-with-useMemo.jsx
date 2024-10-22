import { useState, useMemo } from 'react';

export function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // Recalculate visible todos only when either todos changes or filter.
  const visibleTodos = useMemo(
    () => getFilteredTodos(todos, filter),
    [filter, todos],
  );
  // ...

  return <>{/* ... */}</>;
}
