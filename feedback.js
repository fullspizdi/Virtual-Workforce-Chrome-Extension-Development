// feedback.js
// This module handles user feedback for the Virtual Workforce Chrome Extension.

const { monitoringEvents } = require('./monitoring.js');

/**
 * Function to collect user feedback through the UI.
 * @param {string} feedback - The user's feedback.
 */
function collectFeedback(feedback) {
    console.log(`Feedback received: ${feedback}`);
    // Emit an event to log this feedback
    monitoringEvents.emit('feedback', feedback);
}

/**
 * Function to handle feedback submission from the UI.
 */
function handleFeedbackSubmission() {
    const feedbackButton = document.getElementById('submitFeedback');
    const feedbackInput = document.getElementById('feedbackInput');

    feedbackButton.addEventListener('click', () => {
        const feedback = feedbackInput.value.trim();
        if (feedback) {
            collectFeedback(feedback);
            feedbackInput.value = ''; // Clear the input after submission
            alert('Thank you for your feedback!');
        } else {
            alert('Please enter some feedback before submitting.');
        }
    });
}

/**
 * Initializes the feedback functionality.
 */
function initFeedback() {
    document.addEventListener('DOMContentLoaded', function() {
        handleFeedbackSubmission();
    });
}

module.exports = {
    collectFeedback,
    initFeedback
};
