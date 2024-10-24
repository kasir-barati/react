import { lazy, Suspense } from 'react';
import { LoadingSpinnerEclipsingMoon } from '../loading-spinner/LoadingSpinner.component';
import { artists as dummyData } from '../../dummy-data/artists.dummy-data';
import { Artist } from '../../types/artist.type';
import './Artists.component.css';
import { fakeFetch } from '../../utils/fake-fetch.util';

export function Artists() {
  return (
    <section className="artists-container">
      <h2 className="artists-container__header">Artists</h2>
      <Suspense fallback={<LoadingSpinnerEclipsingMoon />}>
        <List />
      </Suspense>
    </section>
  );
}

const List = lazy(async () => {
  const artists = await fakeFetch(dummyData, 1000);

  return {
    default() {
      return (
        <ul className="artists-list">
          {artists.map((artist) => (
            <li className="artist" key={artist.id}>
              <h3 className="artist-name">{artist.name}</h3>
              <p className="artist-bio">{artist.bio}</p>
              <p className="artist-time-period">
                <time>{artist.dateOfBirth}</time>-
                <time>{artist.dateOfDeath}</time>
              </p>
              <p className="artist-country">{artist.country}</p>
              <picture className="artist-country-flag">
                <img src={getFlagSrc(artist.country)} />
              </picture>
            </li>
          ))}
        </ul>
      );
    },
  };
});

function getFlagSrc(country: string) {
  if (country.toLocaleLowerCase() === 'south korea') {
    return '/south-korea.png';
  }
  return `${country.toLocaleLowerCase()}.png`;
}
