import { useState, useEffect } from 'react';

export function TodoList({ todos }) {
  const [filter, setFilter] = useState('');
  const [filteredTodos, setFilteredTodos] = useState(todos);

  // Inefficient use of useEffect to filter the list.
  // Remove the useEffect entirely and it won't even affect your component's functionality!
  useEffect(() => {
    const filtered = todos.filter((item) =>
      item.toLowerCase().includes(filter.toLowerCase()),
    );
    setFilteredTodos(filtered); // This triggers a state update
  }, [filter, todos]);

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
