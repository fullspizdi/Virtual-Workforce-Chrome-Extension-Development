// stealthMode.js
// This module implements stealth operations to run the Chrome extension in a background or hidden process
// and includes security measures to avoid detection.

const puppeteer = require('puppeteer');

/**
 * Launches a Puppeteer browser instance with stealth settings.
 * @returns {Promise<import('puppeteer').Browser>}
 */
async function launchStealthBrowser() {
    return puppeteer.launch({
        headless: true, // Run browser in headless mode
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--window-position=0,0',
            '--ignore-certificate-errors',
            '--ignore-certificate-errors-spki-list',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    });
}

/**
 * Enhances stealth by modifying the default Puppeteer browser fingerprint.
 * @param {import('puppeteer').Page} page - The Puppeteer page object.
 * @returns {Promise<void>}
 */
async function enhanceStealth(page) {
    await page.evaluateOnNewDocument(() => {
        // Pass the Webdriver test
        Object.defineProperty(navigator, 'webdriver', {
            get: () => false,
        });

        // Pass the Chrome test
        window.navigator.chrome = {
            runtime: {},
            // etc.
        };

        // Pass the Permissions test
        const originalQuery = window.navigator.permissions.query;
        window.navigator.permissions.query = (parameters) => (
            parameters.name === 'notifications' ?
                Promise.resolve({ state: Notification.permission }) :
                originalQuery(parameters)
        );

        // Pass the Plugins Length test
        Object.defineProperty(navigator, 'plugins', {
            get: () => [1, 2, 3, 4, 5],
        });

        // Pass the Languages test
        Object.defineProperty(navigator, 'languages', {
            get: () => ['en-US', 'en'],
        });
    });
}

module.exports = {
    launchStealthBrowser,
    enhanceStealth
};
