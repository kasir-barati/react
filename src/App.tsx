import './App.css';
import { words } from './assets/words.asset';
import { WordCloud } from './components/word-cloud/WordCloud.component';

function App() {
  return (
    <>
      <WordCloud words={words} />
      <section
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
