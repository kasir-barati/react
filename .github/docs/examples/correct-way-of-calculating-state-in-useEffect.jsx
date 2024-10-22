import { useState, useEffect } from 'react';

export function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const connection = createConnection();

    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages((previousMessages) => [
        ...previousMessages,
        receivedMessage,
      ]);
    });

    return () => connection.disconnect();
  }, [roomId]); // No messages!
  // ...
}
