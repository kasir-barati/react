import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InfiniteScrollNews } from '../components/post/InfiniteScrollNews.component';
import styles from './app.module.css';

export function App() {
  return (
    <>
      {/* <Artists /> */}
      {/* <Messenger /> */}
      {/* <Timer /> */}
      {/* <Faq /> */}
      {/* <Post /> */}
      {/* <NormalSearch /> */}
      {/* <DebouncingSearch /> */}
      {/* <LodashDebounceSearch /> */}
      {/* <Stopwatch /> */}
      {/* <TaskManager /> */}
      {/* <TaskManager /> */}
      {/* <WordCloud words={words} /> */}
      {/* <InfiniteScrollFeed /> */}
      <InfiniteScrollNews />
      <section
        className={styles.btn}
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
          <code>onClickCapture</code> VS <code>onClick</code>
        </button>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}

export default App;
