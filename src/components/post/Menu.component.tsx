import {
  BookmarkIcon,
  ChatBubbleBottomCenterIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline';
import { PostMetadata } from '../../types/post.type';
import './Menu.component.css';

interface MenuProps {
  postMetadata?: PostMetadata;
}

export function Menu({ postMetadata }: Readonly<MenuProps>) {
  return (
    <menu className="toolbar-commands">
      <li>
        <button title="Add reaction" type="button">
          <HeartIcon aria-label="Like" role="img" />
          {postMetadata?.reactionsCount}
        </button>
      </li>
      <li>
        <a href="#commentsSection" title="Jump to comments">
          <ChatBubbleBottomCenterIcon
            role="img"
            aria-label="Comments"
          />
          {postMetadata?.commentsCount}
        </a>
      </li>
      <li>
        <button type="button" title="Save">
          <BookmarkIcon role="img" aria-label="Bookmark" />
          {postMetadata?.bookmarkCount}
        </button>
      </li>
      <li>
        <button className="gauge" type="button">
          <ScaleIcon role="img" aria-label="Gauge" />
        </button>
      </li>
      <li>
        <button className="share" type="button">
          <EllipsisHorizontalIcon role="img" aria-label="Share" />
        </button>
      </li>
    </menu>
  );
}
