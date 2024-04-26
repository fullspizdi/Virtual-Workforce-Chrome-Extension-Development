// testing.js
// This module handles the testing of all integrated functionalities and automation processes.

const { callGoogleAI } = require('./googleAI');
const { callOpenAI } = require('./openAI');
const { initiateSession, sendMessage } = require('./inworldAI');
const { callAnthropic } = require('./anthropicAI');
const { automateAccountCreation, automateContentPosting, automateInteractions } = require('./mediumAutomation');
const { manageAccounts } = require('./accountManager');

const assert = require('assert');

async function testGoogleAI() {
  try {
    const result = await callGoogleAI({ input: 'test data' });
    console.log('Google AI Test Passed:', result);
  } catch (error) {
    console.error('Google AI Test Failed:', error);
  }
}

async function testOpenAI() {
  try {
    const result = await callOpenAI('Hello world', 50);
    console.log('OpenAI Test Passed:', result);
  } catch (error) {
    console.error('OpenAI Test Failed:', error);
  }
}

async function testInworldAI() {
  try {
    const session = await initiateSession('character-id');
    const messageResponse = await sendMessage(session.session_id, 'Hello');
    console.log('Inworld AI Test Passed:', messageResponse);
  } catch (error) {
    console.error('Inworld AI Test Failed:', error);
  }
}

async function testAnthropicAI() {
  try {
    const decision = await callAnthropic('Choose the best option', ['Option 1', 'Option 2']);
    console.log('Anthropic AI Test Passed:', decision);
  } catch (error) {
    console.error('Anthropic AI Test Failed:', error);
  }
}

async function testMediumAutomation() {
  try {
    await automateAccountCreation();
    await automateContentPosting('Test Account', 'Test Title', 'This is a test post.');
    await automateInteractions('Test Account', 'Like and comment');
    console.log('Medium Automation Test Passed');
  } catch (error) {
    console.error('Medium Automation Test Failed:', error);
  }
}

async function testAccountManager() {
  try {
    await manageAccounts();
    console.log('Account Manager Test Passed');
  } catch (error) {
    console.error('Account Manager Test Failed:', error);
  }
}

async function runAllTests() {
  await testGoogleAI();
  await testOpenAI();
  await testInworldAI();
  await testAnthropicAI();
  await testMediumAutomation();
  await testAccountManager();
}

runAllTests().then(() => {
  console.log('All tests completed.');
}).catch((error) => {
  console.error('An error occurred during tests:', error);
});

