import { useEffect } from 'react';

const serverUrl = 'https://localhost:1234';
const roomId = 'music'; // Not a reactive value anymore

export function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []);
  // ...
}
