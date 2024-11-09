import {
  GetAllNewsQueryString,
  News,
  PaginatedWithSeekMethod,
} from '@react/common';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';
import { myFetch } from '../../utils/my-fetch.util';
import { LoadingSpinnerMoonCraters } from '../loading-spinner/LoadingSpinner.component';
import styles from './InfiniteScroll.module.css';

const NEWS_FETCH_URL = 'http://localhost:3333/news';
const NEWS_FETCH_LIMIT = 20;

export function InfiniteScrollNews() {
  const [news, setNews] = useState<News[]>([]);
  const [hasMore, setHasMore] = useState(true);

  async function refreshData() {
    const { data } = await myFetch<
      PaginatedWithSeekMethod<News>,
      GetAllNewsQueryString
    >({
      endpoint: NEWS_FETCH_URL,
      queryStrings: {
        previousCreatedAt: undefined,
        limit: NEWS_FETCH_LIMIT,
      },
    });

    if (data[0].createdAt === news[0].createdAt) {
      toast('Wow, we do not have any fresh news!', { type: 'info' });
      return;
    }

    toast("You've your fresh news!");
    setNews(data);
  }
  async function fetchData(abortController?: AbortController) {
    const previousCreatedAt =
      news.length !== 0
        ? news[news.length - 1].createdAt.toString()
        : undefined;
    const { data } = await myFetch<
      PaginatedWithSeekMethod<News>,
      GetAllNewsQueryString
    >({
      endpoint: NEWS_FETCH_URL,
      queryStrings: {
        previousCreatedAt,
        limit: NEWS_FETCH_LIMIT,
      },
      signal: abortController?.signal,
    });

    // Because of the react-infinite-scroll-component we cannot skip previous items, we can just add to it.
    /*
     * I am not sure if this is gonna be an issue since if in one page you use this component three times;
     * 1. In feeds.
     * 2. For news.
     * 3. For main content.
     *
     * You're gonna have a lot of data stored in RAM while user is probably interested in the most recent ones. But this is also how LinkedIn is implemented. They are optimizing their web app in someways but scrollbar thumb was getting smaller and smaller as I was scrolling downward.
     */

    setNews((previousNews) => [...previousNews, ...data]);

    if (data.length === 0) {
      setHasMore(false);
    }
  }

  useEffect(() => {
    const abortController = new AbortController();

    fetchData(abortController);

    return () => {
      abortController.abort();
      setNews([]);
      setHasMore(true);
    };
  }, []);

  return (
    <section className={styles.data}>
      <h2 className={styles.data__header}>News</h2>
      <InfiniteScroll
        dataLength={news.length}
        next={fetchData}
        hasMore={hasMore}
        className={styles['no-overflow']}
        endMessage={<p>No more news for today!</p>}
        loader={
          <LoadingSpinnerMoonCraters
            className={styles['data__loading-spinner']}
          />
        }
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>
            &#8595; Pull down to refresh
          </h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>
            &#8593; Release to refresh
          </h3>
        }
        refreshFunction={refreshData}
      >
        <ul className={styles.data__list}>
          {news.map((item) => (
            <li key={item.id}>
              <a href="#">{item.title}</a>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </section>
  );
}
