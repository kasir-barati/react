import './App.css';
import { LodashDebounceSearch } from './components/search/LodashDebounceSearch.component';

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
      <LodashDebounceSearch />
      {/* <Stopwatch /> */}
      {/* <TaskManager /> */}
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
