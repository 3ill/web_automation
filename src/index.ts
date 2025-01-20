import { scrapper } from './scrapper-actions.js';

const main = async () => {
  await scrapper.performAutomation('https://fill.dev/form/credit-card-simple');
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
