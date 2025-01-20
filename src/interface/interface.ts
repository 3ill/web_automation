import { Page } from "puppeteer";

export interface IQuerySelector {
  page: Page;
  selector: string;
}

export interface IPerformInput extends IQuerySelector {
  input: string;
}
