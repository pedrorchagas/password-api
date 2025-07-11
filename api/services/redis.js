const { createClient } = require('redis');
const error_helper = require('../helpers/error_helper');

const client = createClient();

async function checkPassword(password) {
    try {
        await client.connect();
        const result = await client.get(password);
        if (result) return true
        else return false
    } catch (error) {
        return true; 
    } finally{
        await client.destroy()
    }
}

async function savePassword(password, passwordInfo) {
    try {
        await client.connect();
        await client.set(password, 1);
    } catch(error) {
        console.log('savePassword', error)
    } finally {
        await client.destroy();
    }
}

module.exports = {
    checkPassword,
    savePassword,
}