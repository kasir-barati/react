import { useRef } from 'react';
import { useFadeIn } from './use-fade-in-using-useAnimationLoop.hook';

export function Welcome() {
  const ref = useRef<HTMLHeadingElement>(null);

  useFadeIn(ref, 1000);

  return (
    <h1 className="welcome" ref={ref}>
      Welcome
    </h1>
  );
}
