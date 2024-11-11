import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Huaweigram } from '../components/huaweigram/Huaweigram.component';
import styles from './app.module.css';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
      {/* <InfiniteScrollNews /> */}
      {/* <OnClickCaptureVsOnClick /> */}
      <Huaweigram />
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
    </QueryClientProvider>
  );
}

export default App;

function OnClickCaptureVsOnClick() {
  return (
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
  );
}
