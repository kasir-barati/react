import { sleep } from '@react/common';
import { Prisma } from '../src/utils/prisma.util.mjs';
import { Repo } from '../src/utils/repo.util.mjs';

(async () => {
  const dummyDataLength = 1000;
  using repo = new Repo(Prisma.prismaClient);

  if (await isSeeded()) {
    console.log('The database is already seeded!');
    return;
  }

  const feedTitles = new Array(dummyDataLength)
    .fill('')
    .map((title, index) => `Feed #${index + 1}`);
  const newsTitles = new Array(dummyDataLength)
    .fill('')
    .map((title, index) => `News #${index + 1}`);

  for (let i = 0; i < dummyDataLength; i++) {
    await repo.createFeed(feedTitles[i]);
    await repo.createNews(newsTitles[i]);
    await sleep(1);
  }

  async function isSeeded() {
    return (await repo.getFeeds(1, 1)).length > 1;
  }
})()
  .then(console.log.bind(this, 'Seeded.'))
  .catch(console.error.bind(this, 'Something went wrong!'));
