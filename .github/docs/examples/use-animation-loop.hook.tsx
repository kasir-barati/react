import {
  useEffect,
  experimental_useEffectEvent as useEffectEvent,
} from 'react';

export function useAnimationLoop(
  isRunning: boolean,
  drawFrame: (timePassed: number) => void,
) {
  const onFrame = useEffectEvent(drawFrame);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const startTime: number = performance.now();
    let frameId: number | null = null;

    function tick(now?: number) {
      const timePassed = now - startTime;

      onFrame(timePassed);

      frameId = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      if (isNumber(frameId)) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [isRunning]);
}

function isNumber(num: unknown): num is Number {
  return Number.isFinite(num);
}
