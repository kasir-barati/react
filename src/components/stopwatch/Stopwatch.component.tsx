import { useState } from 'react';
import './Stopwatch.component.css';
import classNames from 'classnames';

export function Stopwatch() {
  const [startTime, setStartTime] = useState<number>();
  const [now, setNow] = useState<number>();
  const [intervalId, setIntervalId] = useState<number>();
  const time = now && startTime && (now - startTime) / 1000;
  const isResetDisabled =
    !Number.isFinite(intervalId) &&
    !Number.isFinite(now) &&
    !Number.isFinite(startTime);

  function handleClickStartStop() {
    const now = Date.now();

    if (Number.isFinite(intervalId)) {
      clearInterval(intervalId);
      setIntervalId(undefined);
      return;
    }
    if (!startTime) {
      setStartTime(now);
    }
    setNow(now);
    setIntervalId(setInterval(() => setNow(Date.now()), 10));
  }
  function handleClickReset() {
    clearInterval(intervalId);
    setIntervalId(undefined);
    setStartTime(undefined);
    setNow(undefined);
  }

  return (
    <section className="stopwatch">
      <h2>Stopwatch</h2>
      <p>{`Time passed: ${time ? time.toFixed(3) : ''}`}</p>
      <button
        className={classNames({
          stop: Number.isFinite(intervalId),
        })}
        onClick={handleClickStartStop}
      >
        {intervalId ? 'Stop' : 'Start'}
      </button>
      <button
        className="reset"
        disabled={isResetDisabled}
        onClick={handleClickReset}
      >
        Reset
      </button>
    </section>
  );
}
