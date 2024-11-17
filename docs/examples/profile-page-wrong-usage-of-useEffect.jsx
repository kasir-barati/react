import { useEffect, useState } from 'react';

export function ProfilePage({ userId }) {
  const [comment, setComment] = useState('');

  // Avoid resetting state on prop change in an useEffect.
  // It is inefficient because: ProfilePage and its children will first render with the stale value, then rerender again.
  // Complicated because you'd need to do this in every component that has some state inside ProfilePage.
  useEffect(() => {
    setComment('');
  }, [userId]);
  // ...
}
