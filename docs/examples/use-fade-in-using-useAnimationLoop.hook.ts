import { RefObject, useState } from 'react';
import { useAnimationLoop } from './use-animation-loop.hook';

export function useFadeIn(
  ref: RefObject<HTMLHeadingElement>,
  duration: number,
) {
  const [isRunning, setIsRunning] = useState(true);

  useAnimationLoop(isRunning, (timePassed) => {
    const progress = Math.min(timePassed / duration, 1);

    ref.current!.style.opacity = progress.toString();

    if (progress === 1) {
      setIsRunning(false);
    }
  });
}
