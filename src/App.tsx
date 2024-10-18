import { useEffect, useState } from 'react';
import './App.css';
import { words } from './assets/words.asset';
import { Clock } from './components/clock/Clock.component';
import { WordCloud } from './components/word-cloud/WordCloud.component';
import { getTime } from './utils/get-time.util';
import { Faq } from './components/faq/Faq.component';
import { Messenger } from './components/chat/Messenger.component';
import { TaskManager } from './components/task-manager/TaskManager.component';

function App() {
  // const [time, setTime] = useState(getTime());

  // This line was causing my entire app to rerender each second!
  // useEffect(() => {
  //   setInterval(() => {
  //     setTime(getTime());
  //   }, 1000);
  // }, []);

  return (
    <>
      <TaskManager />
      {/* <Messenger /> */}
      {/* <Clock time={time} /> */}
      {/* TODO: fix performance issue of the WordCloud component */}
      {/* <WordCloud words={words} /> */}
      {/* <section
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
      </section> */}
      {/* <Faq /> */}
    </>
  );
}

export default App;
