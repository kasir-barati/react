import { ChangeEvent, useState } from 'react';
import './Clock.component.css';

interface ClockProps {
  time: string;
}

export function Clock({ time }: ClockProps) {
  const [text, setText] = useState('');
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }
  return (
    <section className="clock">
      <h1 className="clock__timer">{time}</h1>
      <input
        className="clock__input"
        type="text"
        value={text}
        onChange={handleChange}
      />
    </section>
  );
}
