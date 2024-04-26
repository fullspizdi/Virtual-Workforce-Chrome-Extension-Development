// openAI.js
// This module handles integration with OpenAI for accessing GPT models.

const axios = require('axios');
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_ENDPOINT = 'https://api.openai.com/v1/engines/davinci-codex/completions';

/**
 * Function to call OpenAI API for generating text using GPT models.
 * @param {String} prompt - The input prompt for the GPT model.
 * @param {Number} maxTokens - The maximum number of tokens to generate.
 * @returns {Promise<Object>} - The generated text from the GPT model.
 */
async function callOpenAI(prompt, maxTokens = 150) {
  try {
    const response = await axios.post(OPENAI_ENDPOINT, {
      prompt: prompt,
      max_tokens: maxTokens,
      temperature: 0.5
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
}

module.exports = {
  callOpenAI
};
