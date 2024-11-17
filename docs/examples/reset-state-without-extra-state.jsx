import { useState } from 'react';

export function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  // Best: Calculate everything during rendering
  const selected =
    items.find((item) => item.id === selectedItemId) ?? null;
  // ...
}
