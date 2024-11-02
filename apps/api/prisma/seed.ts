import { Prisma } from '../src/utils/prisma.util.mjs';
import { Repo } from '../src/utils/repo.util.mjs';

(async () => {
  using repo = new Repo(Prisma.prismaClient);

  if (await isSeeded()) {
    console.log('The database is already seeded!');
    return;
  }

  const titles = new Array(1000).fill('').map((title, index) => {
    return `Feed #${index + 1}`;
  });

  for (const title of titles) {
    await repo.createFeed(title);
    await fakeSleep(1);
  }

  async function isSeeded() {
    return (await repo.getFeeds(1, 1)).length > 1;
  }
})()
  .then(console.log.bind(this, 'Seeded.'))
  .catch(console.error.bind(this, 'Something went wrong!'));

export function fakeSleep(milliseconds: number) {
  return new Promise((resolve, _reject) => {
    setTimeout(resolve, milliseconds);
  });
}
