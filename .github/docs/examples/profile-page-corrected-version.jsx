import { useState } from 'react';

export function ProfilePage({ userId }) {
  return (
    <>
      {/* When we give ach user’s profile an explicit key, 
      then react treats them conceptually a different profile */}
      <Profile userId={userId} key={userId} />;
    </>
  );
}

function Profile({ userId }) {
  // This and any other state below will reset on key change automatically
  const [comment, setComment] = useState('');
  // ...
}
