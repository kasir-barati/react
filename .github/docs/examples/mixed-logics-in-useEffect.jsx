import { useEffect } from 'react';

export function ChatRoom({ roomId }) {
  useEffect(() => {
    // This line was added to send the logs
    logVisit(roomId);
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId]);
  // ...
}
