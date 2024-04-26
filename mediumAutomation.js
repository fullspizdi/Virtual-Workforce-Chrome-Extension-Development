// mediumAutomation.js
// This module handles automation tasks on Medium.com including account creation, content posting, and interactions.

const puppeteer = require('puppeteer');
require('dotenv').config();

const BASE_URL = 'https://medium.com';

/**
 * Function to automate account creation on Medium.com.
 * @returns {Promise<void>}
 */
async function automateAccountCreation() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(`${BASE_URL}/m/signin`, { waitUntil: 'networkidle2' });
    // Assuming using Google for quick signup
    await page.click('[data-action="google-auth"]');
    await page.waitForNavigation();

    // Fill in Google Auth details
    await page.type('input[type="email"]', process.env.GOOGLE_EMAIL);
    await page.click('#identifierNext');
    await page.waitForSelector('input[type="password"]', { visible: true });
    await page.type('input[type="password"]', process.env.GOOGLE_PASSWORD);
    await page.click('#passwordNext');
    await page.waitForNavigation();

    console.log('Account created successfully');
  } catch (error) {
    console.error('Failed to create account on Medium:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

/**
 * Function to automate content posting on Medium.com.
 * @param {String} title - The title of the post.
 * @param {String} content - The content of the post.
 * @returns {Promise<void>}
 */
async function automateContentPosting(title, content) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(`${BASE_URL}/new-story`, { waitUntil: 'networkidle2' });

    // Enter the title and content
    await page.type('textarea[placeholder="Title"]', title);
    await page.type('div[placeholder="Tell your story…"]', content);

    // Publish the post
    await page.click('[data-action="publish"]');
    await page.waitForSelector('.button[data-action="publish-confirm"]', { visible: true });
    await page.click('.button[data-action="publish-confirm"]');
    await page.waitForNavigation();

    console.log('Content posted successfully');
  } catch (error) {
    console.error('Failed to post content on Medium:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

/**
 * Function to automate interactions on Medium.com.
 * @param {String} postUrl - The URL of the post to interact with.
 * @returns {Promise<void>}
 */
async function automateInteractions(postUrl) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(postUrl, { waitUntil: 'networkidle2' });

    // Clap for the post
    await page.click('button[data-action="clap"]');
    console.log('Interacted with the post successfully');
  } catch (error) {
    console.error('Failed to interact with the post on Medium:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

module.exports = {
  automateAccountCreation,
  automateContentPosting,
  automateInteractions
};
