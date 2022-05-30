const browser = require('./browser');
const path = require('path');

class Rectangle {
    async deleteFunctionality() {
        it('Verify Delete Functionality on ExcaliDraw', async () => {
            try {
                await browser.page.waitForSelector('[data-testid="clear-canvas-button"]', { visible: true });
                await browser.page.click('[data-testid="clear-canvas-button"]');
                await browser.page.waitForSelector('.confirm-dialog--confirm > .ToolIcon__icon');
                await expect(browser.page).toMatchElement('.clear-canvas__content', { text: 'This will clear the whole canvas. Are you sure?' });
                await browser.page.click('.confirm-dialog--confirm > .ToolIcon__icon');
            } catch (error) {
                await browser.page.screenshot({ path: 'clearCanvas.png' });
                throw error;
            }
        });
    }

    async exportFunctionality() {
        it('Draw Rectangle and verify Download funcionality ', async () => {
            try {
                await browser.page.goto('https://excalidraw.com/', { waitUntil: 'networkidle0' });
                //Draw Rectangle
                await this.Draw('[aria-label="Rectangle"]');
                //Draw an ellipse
                await this.Draw('[aria-label="Ellipse"]');
                await browser.page.waitForSelector('[data-testid="image-export-button"]');
                await browser.page.click('[data-testid="image-export-button"]');
                await browser.page.waitForSelector('[title="Export to PNG"]');
                await browser.page._client.send("Page.setDownloadBehavior", {
                    behavior: "allow",
                    downloadPath: path.resolve(__dirname, './downloadImage')
                });
                await browser.page.click('[title="Export to PNG"]');
                await browser.page.keyboard.press('Enter');
                await browser.page.click('[aria-label="Close"]');
            } catch (error) {
                await browser.page.screenshot({ path: 'export.png' });
                throw error;
            }
        });
    }

    async Draw(shapeSelector) {
        await browser.page.waitForSelector(shapeSelector)
        await browser.page.click(shapeSelector)
        await browser.page.mouse.move(300, 100);
        await browser.page.mouse.down();
        await browser.page.mouse.move(800, 300);
        await browser.page.mouse.up();
        await browser.page.waitForTimeout(500);
    }
}

module.exports = new Rectangle();