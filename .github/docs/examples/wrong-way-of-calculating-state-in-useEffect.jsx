import { useState, useEffect } from 'react';

export function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const connection = createConnection();

    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages([...messages, receivedMessage]);
    });

    return () => connection.disconnect();

    // messages state as a dep forces your component to reconnect on each new message
  }, [roomId, messages]);

  // ...
}
