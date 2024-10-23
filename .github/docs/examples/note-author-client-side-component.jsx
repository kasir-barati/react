import { useEffect, useState } from 'react';

export function Note({ id }) {
  const [note, setNote] = useState('');

  // NOTE: loads *after* first render.
  useEffect(() => {
    fetch(`/api/notes/${id}`).then((data) => {
      setNote(data.note);
    });
  }, [id]);

  return (
    <div>
      <Author id={note.authorId} />
      <p>{note}</p>
    </div>
  );
}

export function Author({ id }) {
  const [author, setAuthor] = useState('');

  // NOTE: loads *after* Note renders.
  useEffect(() => {
    fetch(`/api/authors/${id}`).then((data) => {
      setAuthor(data.author);
    });
  }, [id]);

  return <span>By: {author.name}</span>;
}
