import { useState, useEffect } from 'react';

export function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Avoid adjusting state on prop change in a useEffect
  useEffect(() => {
    setSelectedItem(null);
  }, [items]);
  // ...
}
