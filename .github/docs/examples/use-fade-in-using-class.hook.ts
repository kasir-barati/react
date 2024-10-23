import { RefObject, useEffect } from 'react';
import { FadeInAnimation } from './fade-in-animation';

export function useFadeIn(
  ref: RefObject<HTMLHeadingElement>,
  duration: number,
) {
  useEffect(() => {
    const animation = new FadeInAnimation(ref.current);

    animation.start(duration);

    return () => {
      animation.stop();
    };
  }, [ref, duration]);
}
