/*jshint esversion: 6 */
// Set Expect-Puppeteer Timeout
const { setDefaultOptions } = require('expect-puppeteer')
setDefaultOptions({ timeout: 5000 })

const browser = require('./browser.js');
const rectangle = require('./rectangle.js');

jest.setTimeout("50000");

beforeAll(async () => {
  await browser.setup();
});

afterAll(async () => {
  await browser.teardown();
});

describe("Assignment : Task 3", () => {
  rectangle.exportFunctionality();
  rectangle.deleteFunctionality();
});