import { useState } from 'react';

export function TodoList({ todos }) {
  const [filter, setFilter] = useState('');
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const filtered = todos.filter((todo) =>
    todo.toLowerCase().includes(filter.toLowerCase()),
  );
  setFilteredTodos(filtered); // This triggers a state update

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter todo"
      />

      <ul>
        {filteredTodos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}
