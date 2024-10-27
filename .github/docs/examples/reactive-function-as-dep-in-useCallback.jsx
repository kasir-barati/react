export function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');
  // ...
  function createOptions() {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId,
    };
  }
  // ...
  useEffect(() => {
    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    // ...
  }, [createOptions]); // createOptions changes on every render!
  // ...
}

export function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');
  // ...
  const createOptions = useCallback(() => {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId,
    };
  }, [roomId]); // Only changes when roomId changes
  // ...
  useEffect(() => {
    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]); // Only changes when createOptions changes
  // ...
}

export function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');
  // ...
  useEffect(() => {
    function createOptions() {
      // No need for useCallback or function dependencies!
      return {
        serverUrl: 'https://localhost:1234',
        roomId: roomId,
      };
    }
    // ...
    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // Depends on roomId changes
  // ...
}
