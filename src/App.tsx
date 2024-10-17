import { useEffect, useState } from 'react';
import './App.css';
import { words } from './assets/words.asset';
import { Clock } from './components/clock/Clock.component';
import { WordCloud } from './components/word-cloud/WordCloud.component';
import { getTime } from './utils/get-time.util';

function App() {
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    setInterval(() => {
      setTime(getTime());
    }, 1000);
  }, []);

  return (
    <>
      <Clock time={time} />
      {/* TODO: fix performance issue of the WordCloud component */}
      {/* <WordCloud words={words} /> */}
      <section
        className="btn"
        onClickCapture={() => {
          console.log('onClickCapture section');
        }}
      >
        <button
          onClick={(e) => {
            console.log('onClick button #1');
            e.stopPropagation();
          }}
        >
          BTN1
        </button>
      </section>
    </>
  );
}

export default App;
