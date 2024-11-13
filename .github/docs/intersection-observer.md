# [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

- A modern development technique.
- Can detect when elements come into view.
- E.g. when element comes into view start fetching data.
- Observes changes in the intersection of target elements with, an ancestor element or the viewport.
- Well-suited to implement infinite scrolling.

You can make use of so called sentinel elements, where in your case since you need to fetch next and previous data, you'd mount the first and last element as a sentinel element with an Intersection Observer

It's a more robust approach fundamentally

When ever you are approaching these items, you fire off a function, which will be your fetch function

You should take a step back and really think about what you need to do fundamentally

1. You need a way to observe when something comes within a desirable viewport.
2. You need to do something when that thing meets the criteria above.

Intersection Observer is created to tackle the above - you can observe an element to do something when it comes within a desirable viewport.

- Intersection Observer is a native browser API
- https://usehooks-ts.com/react-hook/use-intersection-observer
  - Here's a hook, the next step would be to create sentinel elements that you'd observe

Where Sentinel is a component that registers itself to be monitored and fires a callback when it's intersecting
The handlers need to check scroll direction because the first item will always be visible on mount, so you wouldn't want to be calling that handler unless the user scrolls up. You could always have this logic inside of the Sentinel component.

https://www.npmjs.com/package/react-virtualized

Throttling is typically used to slow down calls
Debounce is to not call something until x seconds has passed without the value changing
So if you throttle the scroll handler with 500ms, it could call the callback function every 500ms and swallow the other calls
While if you were to debounce the scroll handler with 500ms, it would only be called after the user hasn't scrolled for 500ms

```tsx
// No, you're not. No dep is defined in the useCallback dep array. So why should ReactJS does that?

// Not because of react, but because of javascript. You're invoking the debounce function, that will always happen every render/execution of your component function.

const debounce = () => {
  console.log('reset timer');
  return () => void 0;
};

const Foo = () => {
  const [, rerender] = useState(0);
  const fn = useCallback(debounce(), []);

  return (
    <>
      <button onClick={() => rerender((s) => s + 1)}>
        Re-render
      </button>
    </>
  );
};
```

```tsx
// Sentinel.tsx
interface SentinelProps {
  as?: ReactNode;
  children: ReactNode;
  threshold: number;
  onIntersect: () => void;
}

const Sentinel = ({
  as,
  children,
  threshold,
  onIntersect,
}: SentinelProps) => {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold,
  });

  useEffect(() => {
    if (isIntersecting) {
      onIntersect();
    }
  }, [isIntersecting]);

  const Component = as ?? 'div';

  return <Component ref={ref}>{children}</Component>;
};

// array.ts
export function isFirst<T>(array: T[], index: number) {
  return array.length > 0 && index === 0;
}

export function isLast<T>(array: T[], index: number) {
  return array.length > 0 && index === array.length - 1;
}

// scroll.ts
export const SCROLL_DIRECTION = {
  UP: 'UP',
  DOWN: 'DOWN',
};
export function useScrollDirection() {
  const ref = useRef<HTMLElement>(null);
  const scrollY = useRef(ref.current.scrollTop);
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    if (ref.current) {
      const handleScroll = (e) => {
        if (scrollY.current > e.target.scrollTop) {
          setScrollDirection(SCROLL_DIRECTION.UP);
        } else {
          setScrollDirection(SCROLL_DIRECTION.DOWN);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.addEventListener('scroll', handleScroll);
    }
  }, [ref.current]);

  return { ref, scrollDirection };
}

const Component = () => {
  const [page, setPage] = useState(0);
  const { ref, scrollDirection } = useScrollDirection();
  const feed = useFeed(page);

  const handleFirstSentinelOnIntersect = () => {
    if (scrollDirection === SCROLL_DIRECTION.UP) {
      setPage((curr) => curr - 1);
    }
  };

  return (
    <List ref={ref}>
      {feed.map((item, index) => {
        if (isFirst(feed, index)) {
          return (
            <Sentinel
              as="li"
              threshold={1.5}
              onIntersect={handleFirstSentinelOnIntersect}
            >
              <FeedItem item={item} />
            </Sentinel>
          );
        }
        if (isLast(feed, item)) {
          <Sentinel
            as="li"
            threshold={1.5}
            onIntersect={() => setPage((curr) => curr + 1)}
          >
            <FeedItem item={item} />
          </Sentinel>;
        }

        return <FeedItem item={item} />;
      })}
    </List>
  );
};
```
