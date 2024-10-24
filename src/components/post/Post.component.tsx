import { Menu } from './Menu.component';
import { Sidebar } from './Sidebar.component';
import './Post.component.css';
import { lazy, Suspense, useEffect, useState } from 'react';
import { fakeFetch } from '../../utils/fake-fetch.util';
import { LoadingSpinnerFullMoon } from '../loading-spinner/LoadingSpinner.component';
import { PostMetadata } from '../../types/post.type';

export function Post() {
  const [postMetadata, setPostMetadata] = useState<PostMetadata>();

  useEffect(() => {
    fakeFetch(
      { commentsCount: 12, bookmarkCount: 43, reactionsCount: 12 },
      500,
    ).then(setPostMetadata);
  }, []);

  return (
    <div className="post">
      <Menu postMetadata={postMetadata} />
      <Suspense
        fallback={
          <LoadingSpinnerFullMoon style={{ justifySelf: 'center' }} />
        }
      >
        <PostContent />
      </Suspense>
      <Sidebar />
    </div>
  );
}

const PostContent = lazy(async () => {
  const data = await fakeFetch({ markdown: '# hi' }, 1000);

  return {
    default() {
      return <main className="">{data.markdown}</main>;
    },
  };
});
