import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer-extra') as any;
const StealthPlugin = require('puppeteer-extra-plugin-stealth') as any;
puppeteer.use(StealthPlugin());

export class Puppeteer {
  getPuppeteer() {
    return puppeteer;
  }
}
