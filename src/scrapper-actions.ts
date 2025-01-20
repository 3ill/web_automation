import { Browser } from 'puppeteer';
import { Puppeteer } from './get-puppeteer.js';
import { IPerformInput, IQuerySelector } from './interface/interface.js';
import { ElementHandle } from 'puppeteer';

class Scrapper {
  private puppeteer: Puppeteer;

  constructor() {
    this.puppeteer = new Puppeteer();
  }

  initPuppeteer() {
    return this.puppeteer.getPuppeteer();
  }

  async lauchBrowser() {
    const stealthInstance = this.initPuppeteer();
    const browser: Browser = stealthInstance.launch({ headless: false });
    return browser;
  }

  async navigateUrl(url: string) {
    const browser = await this.lauchBrowser();
    const page = await browser.newPage();
    await page.goto(`${url}`, {
      timeout: 500000,
    });

    return page;
  }

  async querySelector(params: IQuerySelector) {
    const { page, selector } = params;
    await page.waitForSelector(selector);
  }

  async performClick(params: IQuerySelector) {
    const { page, selector } = params;

    if (!selector) return;
    const element: ElementHandle<Element> | null = await page.$(selector);

    console.log(`Element Clicked: ${element}`);

    if (element) {
      await element.click();
      console.log(`Element Clicked Successfully`);
    } else {
      console.warn(`Selector: ${selector} is invalid`);
    }
  }

  async performInput(params: IPerformInput) {
    const { page, selector, input } = params;
    await page.type(selector, input);
  }

  async performDropDownSelection(params: IPerformInput) {
    const { page, selector, input: selection } = params;
    await page.select(selector, selection);
  }

  async performAutomation(url: string) {
    const page = await this.navigateUrl(url);

    let selector = "input[id='cc-name']";
    await this.querySelector({ page, selector });
    await this.performInput({ page, selector, input: 'Egbu Chikezie' });

    selector = "select[id='cc-type']";
    await this.performDropDownSelection({ page, selector, input: 'visa' });

    selector = "input[id='cc-number']";
    await this.performInput({ page, selector, input: '2334 5678 1021' });

    selector = "input[id='cc-csc']";
    await this.performInput({ page, selector, input: '233' });

    selector = "select[id='cc-exp-month']";
    await this.performDropDownSelection({ page, selector, input: '07' });

    selector = "select[id='cc-exp-year']";
    await this.performDropDownSelection({ page, selector, input: '2028' });

    selector = "button[type='submit']";
    await this.performClick({ page, selector });
  }
}

export const scrapper = new Scrapper();
