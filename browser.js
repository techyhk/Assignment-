/*jshint esversion: 6 */
const puppeteer = require('puppeteer')

class BrowserSession {
  async setup() {
    this.browser = await puppeteer.launch({
      headless: true,
      slowMo: 100,
      defaultViewport: {
        width: 1366,
        height: 768
      }
    });
    this.page = await this.browser.newPage()
    this.page.on(async (dialog) => {
      console.log(dialog.message());
      await dialog.accept();
    });
  }

  async teardown() {
    await this.browser.close()
  }
}

module.exports = new BrowserSession()