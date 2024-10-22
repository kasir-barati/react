import { useState } from 'react';

export function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // Recalculate visible todos with each rerender regardless of if it is needed!
  const visibleTodos = getFilteredTodos(todos, filter);
  // ...

  return <>{/* ... */}</>;
}
