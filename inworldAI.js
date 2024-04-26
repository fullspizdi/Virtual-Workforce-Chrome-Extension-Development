// inworldAI.js
// This module handles integration with Inworld AI for dialogue simulations.

const axios = require('axios');
require('dotenv').config();

const INWORLD_AI_API_KEY = process.env.INWORLD_AI_API_KEY;
const INWORLD_AI_ENDPOINT = 'https://api.inworldai.com/v1/sessions';

/**
 * Function to initiate a dialogue session with Inworld AI.
 * @param {String} characterId - The ID of the AI character to interact with.
 * @returns {Promise<Object>} - The session initiation response.
 */
async function initiateSession(characterId) {
  try {
    const response = await axios.post(INWORLD_AI_ENDPOINT, {
      character_id: characterId
    }, {
      headers: {
        'Authorization': `Bearer ${INWORLD_AI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error initiating session with Inworld AI:', error);
    throw error;
  }
}

/**
 * Function to send a message to an Inworld AI character.
 * @param {String} sessionId - The session ID for the dialogue.
 * @param {String} message - The message to send to the AI character.
 * @returns {Promise<Object>} - The AI's response to the message.
 */
async function sendMessage(sessionId, message) {
  try {
    const response = await axios.post(`${INWORLD_AI_ENDPOINT}/${sessionId}/messages`, {
      message: message
    }, {
      headers: {
        'Authorization': `Bearer ${INWORLD_AI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message to Inworld AI:', error);
    throw error;
  }
}

module.exports = {
  initiateSession,
  sendMessage
};
