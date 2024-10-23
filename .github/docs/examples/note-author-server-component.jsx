import db from './database';

export async function Note({ id }) {
  // NOTE: loads *during* render.
  const note = await db.notes.get(id);

  return (
    <div>
      <Author id={note.authorId} />
      <p>{note}</p>
    </div>
  );
}

export async function Author({ id }) {
  // NOTE: loads *after* Note,
  // but is fast if data is co-located.
  const author = await db.authors.get(id);

  return <span>By: {author.name}</span>;
}
