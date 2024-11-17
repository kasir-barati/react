export function ReportList({ items }) {
  return (
    <article>
      {items.map((item) => {
        // Cannot call useCallback in a loop!
        const handleClick = useCallback(
          () => sendReport(item),
          [item],
        );
        // Chart component is memoized.
        return (
          <figure key={item.id}>
            <Chart onClick={handleClick} />
          </figure>
        );
      })}
    </article>
  );
}

export function ReportList({ items }) {
  // useCallback called outside of a loop, at the top level.
  const handleClick = useCallback((item) => sendReport(item), []);

  return (
    <article>
      {items.map((item) => {
        // Chart component is memoized.
        return (
          <figure key={item.id}>
            <Chart onClick={handleClick} />
          </figure>
        );
      })}
    </article>
  );
}

export function ReportList({ items }) {
  return (
    <article>
      {items.map((item) => (
        <Report key={item.id} item={item} />
      ))}
    </article>
  );
}

export function Report({ item }) {
  // useCallback called at the top level.
  const handleClick = useCallback(() => {
    sendReport(item);
  }, [item]);

  return (
    <figure>
      <Chart onClick={handleClick} />
    </figure>
  );
}

const Report = memo(function Report({ item }) {
  function handleClick() {
    sendReport(item);
  }

  return (
    <figure>
      <Chart onClick={handleClick} />
    </figure>
  );
});
