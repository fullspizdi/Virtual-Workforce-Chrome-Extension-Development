// accountManager.js
// This module manages multiple Medium.com accounts for automation purposes.

const { automateAccountCreation, automateContentPosting, automateInteractions } = require('./mediumAutomation');
const fs = require('fs');
const path = require('path');

const ACCOUNTS_FILE = path.join(__dirname, 'accounts.json');

/**
 * Load existing accounts from a JSON file.
 * @returns {Promise<Array>}
 */
async function loadAccounts() {
    return new Promise((resolve, reject) => {
        fs.readFile(ACCOUNTS_FILE, (err, data) => {
            if (err) {
                console.error('Error reading accounts file:', err);
                return reject(err);
            }
            try {
                const accounts = JSON.parse(data);
                resolve(accounts);
            } catch (parseErr) {
                console.error('Error parsing accounts data:', parseErr);
                reject(parseErr);
            }
        });
    });
}

/**
 * Save accounts to a JSON file.
 * @param {Array} accounts - The accounts to save.
 * @returns {Promise<void>}
 */
async function saveAccounts(accounts) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(accounts, null, 2);
        fs.writeFile(ACCOUNTS_FILE, data, (err) => {
            if (err) {
                console.error('Error writing accounts file:', err);
                return reject(err);
            }
            resolve();
        });
    });
}

/**
 * Create a new Medium account and save it.
 * @returns {Promise<void>}
 */
async function createAndSaveAccount() {
    try {
        await automateAccountCreation();
        const accounts = await loadAccounts();
        const newAccount = {
            email: process.env.GOOGLE_EMAIL,
            password: process.env.GOOGLE_PASSWORD,
            createdAt: new Date().toISOString()
        };
        accounts.push(newAccount);
        await saveAccounts(accounts);
        console.log('New account added and saved successfully');
    } catch (error) {
        console.error('Failed to create and save new account:', error);
        throw error;
    }
}

/**
 * Get all accounts.
 * @returns {Promise<Array>}
 */
async function getAllAccounts() {
    try {
        const accounts = await loadAccounts();
        return accounts;
    } catch (error) {
        console.error('Failed to get accounts:', error);
        throw error;
    }
}

module.exports = {
    createAndSaveAccount,
    getAllAccounts
};
