// anthropicAI.js
// This module handles integration with Anthropic for decision making and content personalization.

const axios = require('axios');
require('dotenv').config();

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_ENDPOINT = 'https://api.anthropic.com/v1/decisions';

/**
 * Function to call Anthropic API for decision making and content personalization.
 * @param {Object} context - The context or scenario for which a decision is needed.
 * @param {Object} options - The possible options from which the AI should choose.
 * @returns {Promise<Object>} - The decision made by the AI.
 */
async function callAnthropic(context, options) {
  try {
    const response = await axios.post(ANTHROPIC_ENDPOINT, {
      context: context,
      options: options
    }, {
      headers: {
        'Authorization': `Bearer ${ANTHROPIC_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error calling Anthropic:', error);
    throw error;
  }
}

module.exports = {
  callAnthropic
};
