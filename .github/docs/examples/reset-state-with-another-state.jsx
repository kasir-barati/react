import { useState } from 'react';

export function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // A better approach is adjust the state while rendering
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setSelectedItem(null);
  }
  // ...
}
