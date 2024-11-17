import { useEffect, useRef } from 'react';

export function Welcome() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const duration = 1000;
    const node = ref.current;
    let startTime: number | null = performance.now();
    let frameId: number | null = null;

    function onFrame(now: number) {
      const timePassed = now - startTime!;
      const progress = Math.min(timePassed / duration, 1);

      onProgress(progress);

      // Do we still have more frames to paint?
      if (progress < 1) {
        frameId = requestAnimationFrame(onFrame);
      }
    }

    function onProgress(progress) {
      node!.style.opacity = progress;
    }

    function start() {
      onProgress(0);
      startTime = performance.now();
      frameId = requestAnimationFrame(onFrame);
    }

    function stop() {
      cancelAnimationFrame(frameId!);
      startTime = null;
      frameId = null;
    }

    start();
    return () => stop();
  }, []);

  return (
    <h1 className="welcome" ref={ref}>
      Welcome
    </h1>
  );
}
