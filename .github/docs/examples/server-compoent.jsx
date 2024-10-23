import marked from 'marked'; // Not included in bundle
import sanitizeHtml from 'sanitize-html'; // Not included in bundle

// Async components are new feature of ReactJS
export async function Page({ page }) {
  // NOTE: loads *during* render, when the app is built.
  const content = await file.readFile(`${page}.md`);

  return <div>{sanitizeHtml(marked(content))}</div>;
}
