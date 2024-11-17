// use-online-status.hook.ts
import { useEffect, useState } from 'react';

export function useOnlineStatus() {
  // Not ideal: Manual store subscription in an Effect
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    function updateState() {
      setIsOnline(navigator.onLine);
    }

    updateState();

    window.addEventListener('online', updateState);
    window.addEventListener('offline', updateState);
    return () => {
      window.removeEventListener('online', updateState);
      window.removeEventListener('offline', updateState);
    };
  }, []);

  return isOnline;
}

// ChatIndicator.component.tsx
import { useOnlineStatus } from '../hooks/use-online-status.hook.ts';

export function ChatIndicator() {
  const isOnline = useOnlineStatus();
  // ...
}
