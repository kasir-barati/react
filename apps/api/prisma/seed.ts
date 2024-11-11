// import { generateRandomString, sleep } from '@react/common';
// import { generateRandomString, sleep } from '../../../libs/common';
import { FeedRepository } from '../src/repositories/feed.repository.js';
import { NewsRepository } from '../src/repositories/news.repository.js';
import { UserRepository } from '../src/repositories/user.repository.js';
import { Prisma } from '../src/utils/prisma.util.js';

(async () => {
  const dummyDataLength = 1000;
  using feedRepository = new FeedRepository(Prisma.prismaClient);
  using newsRepository = new NewsRepository(Prisma.prismaClient);
  using userRepository = new UserRepository(Prisma.prismaClient);

  if (await isSeeded()) {
    console.log('The database is already seeded!');
    return;
  }

  await userRepository.createUser(
    `Mohammad Jawad`,
    'kasir.barati@gmail.com',
    '754cf10b-d3a3-4851-af9a-11ad51dc8357',
  );

  for (let i = 0; i < dummyDataLength; i++) {
    const email = generateRandomString() + '@fujitsu.jp';

    await feedRepository.createFeed(`Feed #${i + 1}`);
    await newsRepository.createNews(`News #${i + 1}`);
    await userRepository.createUser(`#${i + 1}`, email);
    await sleep(1);
  }

  async function isSeeded() {
    return (await feedRepository.getFeeds(1, 1)).length > 1;
  }
})()
  .then(console.log.bind(this, 'Seeded.'))
  .catch(console.error.bind(this, 'Something went wrong!'));

function generateRandomString(length = 13) {
  const charset = 'abcdefghijklmnopqrstuvwxyz_-';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }

  return randomString;
}
function sleep(milliseconds: number) {
  return new Promise((resolve, _reject) => {
    setTimeout(resolve, milliseconds);
  });
}
