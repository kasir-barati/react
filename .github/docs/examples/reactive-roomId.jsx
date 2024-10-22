import { useEffect } from 'react';

const serverUrl = 'https://localhost:1234';

export function ChatRoom({ roomId }) {
  // This is a reactive value
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // This Effect reads that reactive value
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // So you must specify that reactive value as a dependency of your Effect

  // ...
}
