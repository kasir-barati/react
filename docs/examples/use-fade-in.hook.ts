import { RefObject, useEffect } from 'react';

export function useFadeIn(
  ref: RefObject<HTMLHeadingElement>,
  duration: number,
) {
  useEffect(() => {
    const node = ref.current;
    let startTime: number | null = performance.now();
    let frameId: number | null = null;

    function onFrame(now: number) {
      const timePassed = now - startTime!;
      const progress = Math.min(timePassed / duration, 1);

      onProgress(progress);

      // Do we have more frames to paint?
      if (progress < 1) {
        frameId = requestAnimationFrame(onFrame);
      }
    }

    function onProgress(progress: number) {
      node!.style.opacity = progress.toString();
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
  }, [ref, duration]);
}
