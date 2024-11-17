// ...
const [todos, setTodos] = useState([]);
// ...
const handleAddTodo = useCallback(
  (text) => {
    const newTodo = { id: nextId++, text };
    setTodos([...todos, newTodo]);
  },
  [todos],
);

// ...
const [todos, setTodos] = useState([]);
// ...
const handleAddTodo = useCallback((text) => {
  const newTodo = { id: nextId++, text };
  setTodos((todos) => [...todos, newTodo]);
}, []); // No need for the todos dependency
