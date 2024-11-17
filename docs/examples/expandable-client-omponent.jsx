'use client';

import { useState } from 'react';

export function Expandable({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li>
      <button onClick={() => setExpanded(!expanded)}>Toggle</button>
      {expanded && children}
    </li>
  );
}
