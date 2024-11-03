import {
  GetAllNewsQueryString,
  News,
  Paginated,
} from '@react/common';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { myFetch } from '../../utils/my-fetch.util';
import { LoadingSpinnerMoonCraters } from '../loading-spinner/LoadingSpinner.component';
import styles from './InfiniteScroll.module.css';

const NEWS_FETCH_URL = 'http://localhost:3333/news';
const NEWS_FETCH_LIMIT = 10;

export function InfiniteScrollNews() {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [page, setPage] = useState(0);

  async function fetchData() {
    setIsLoading(true);

    try {
      const data = await myFetch<
        Paginated<News>,
        GetAllNewsQueryString
      >({
        endpoint: NEWS_FETCH_URL,
        queryStrings: {
          page: page + 1,
          limit: NEWS_FETCH_LIMIT,
        },
      });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className={styles.data}>
      <h2 className={styles.data__header}>Feed</h2>
      <InfiniteScroll
        dataLength={news.length}
        next={fetchData}
        hasMore={true}
        endMessage={<p>No more news for today!</p>}
        loader={
          <LoadingSpinnerMoonCraters
            className={styles['data__loading-spinner']}
          />
        }
      >
        <ul className={styles.data__list}>
          {news.map((item) => (
            <li key={item.id}>
              <a href="#">{item.title}</a>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
      {!error && <p>Error: {String(error)}</p>}
    </section>
  );
}
