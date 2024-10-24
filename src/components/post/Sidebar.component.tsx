import { Suspense } from 'react';
import { UserInfo } from './UserInfo.component';
import { LatestPostsOfUser } from './LatestPostsOfUser.component';
import {
  LoadingSpinnerBluePlanet,
  LoadingSpinnerMoonToSun,
  LoadingSpinnerSun,
} from '../loading-spinner/LoadingSpinner.component';
import { fakeFetch } from '../../utils/fake-fetch.util';
import { User } from '../../types/user.type';
import './Sidebar.component.css';
import { Billboard } from './Billboard.component';

export function Sidebar() {
  const data = fakeFetch<User>(
    {
      name: 'Mohammmad Jawad (Kasir) Barati',
      bio: 'A Fullstack dev with love for cutting edge technologies and on his journey to learn and teach. Having a can-do attitude and being industrious gave me the courage to question the status quo.',
      location: 'Bremen, Germany',
      education: 'Bachelor in CS',
      work: 'Software engineer',
      joinedAt: new Date().toISOString(),
      avatar: '/avatar.png',
      bannerColor: '#677573',
      pronounce: 'he/him/his',
      username: 'kasir-barati',
    },
    2000,
  );

  return (
    <aside className="sidebar">
      <Suspense fallback={<LoadingSpinnerMoonToSun />}>
        <UserInfo userInfo={data} />
      </Suspense>
      <Suspense fallback={<LoadingSpinnerSun />}>
        <LatestPostsOfUser userInfo={data} />
      </Suspense>
      <Suspense
        fallback={
          <LoadingSpinnerBluePlanet style={{ alignSelf: 'center' }} />
        }
      >
        <Billboard />
      </Suspense>
    </aside>
  );
}
