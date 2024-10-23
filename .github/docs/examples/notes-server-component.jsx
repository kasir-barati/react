import Expandable from './Expandable';

export async function Notes() {
  const notes = await db.notes.getAll();

  return (
    <ul>
      {notes.map((note) => (
        <Expandable key={note.id}>
          <p>{note}</p>
        </Expandable>
      ))}
    </ul>
  );
}
