import { useEffect } from 'react';

export function useTitle(title: string) {
  useEffect(() => {
    const titleElement = document.querySelector('title');

    if (!titleElement) {
      return;
    }

    titleElement.innerText = title;
  }, []);
}
