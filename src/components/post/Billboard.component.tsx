import { lazy } from 'react';
import { fakeFetch } from '../../utils/fake-fetch.util';
import './Billboard.component.css';

export const Billboard = lazy(async () => {
  const data = await fakeFetch(
    {
      advertiserName: 'Hazelcast',
      logo: '/logo.png',
      image: '/banner.png',
      header: 'Hazelcast covers all your stream processing needs.',
      aShortIntro:
        'Accelerate app development and deployment to realize your real-time potential.',
      cta: 'https://example.com',
    },
    4000,
  );

  return {
    default() {
      return (
        <div className="billboard-border">
          <article className="billboard">
            <h2 className="billboard__header">
              <a href="#">{data.header}</a>
            </h2>
            <a href="#" className="billboard__advertiser-name">
              <img src={data.logo} /> {data.advertiserName}
            </a>
            <img className="billboard__banner" src={data.image} />
            <p className="billboard__description">
              {data.aShortIntro}
            </p>
            <a className="billboard__cta" href={data.cta}>
              Learn more
            </a>
          </article>
        </div>
      );
    },
  };
});
