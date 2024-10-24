import { lazy, useEffect, useState } from 'react';
import { User } from '../../types/user.type';
import './LatestPostsOfUser.component.css';
import { fakeFetch } from '../../utils/fake-fetch.util';
import { LatestPost as LatestPostType } from '../../types/post.type';
import { LatestPost } from './LatestPost.component';

interface LatestPostsOfUserProps {
  userInfo: Promise<User>;
}

export const LatestPostsOfUser = lazy(async () => {
  const latestPosts = await fakeFetch<LatestPostType[]>(
    [
      {
        title: 'Next.js 15 : Incremental Static Regeneration (ISR)',
        tags: ['react', 'nextjs', 'webdev', 'javascript'],
        href: 'example.com',
      },
      {
        title: 'Understanding and Using Javascript Console API',
        tags: ['javascript', 'webdev', 'beginners', 'react'],
        href: 'example.jp',
      },
      {
        title:
          'Most Useful Free APIs and Project ideas for Frontend Developers : Youtube , Spotify and more',
        tags: ['react', 'webdev', 'beginners', 'javascript'],
        href: 'example.de',
      },
    ],
    3000,
  );

  return {
    default({ userInfo }: Readonly<LatestPostsOfUserProps>) {
      const [user, setUser] = useState<User>();

      useEffect(() => {
        userInfo.then(setUser);
      }, [userInfo]);

      if (!user) {
        return;
      }

      return (
        <article className="latest-posts">
          <h2 className="latest-posts-header">
            More from{' '}
            <a href={`https://example.com/${user.username}`}>
              {user.name}
            </a>
          </h2>
          {latestPosts.map((latestPost) => (
            <LatestPost
              key={latestPost.href}
              latestPost={latestPost}
            />
          ))}
        </article>
      );
    },
  };
});
