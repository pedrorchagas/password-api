const redis = require('./redis')
const sequelize = require('./sequelize')
const error_helper = require('../helpers/error_helper')
const env_config = require('../utils/env_config')

async function checkPassword(password) {

    switch (env_config.CONFIG.storageType()) {
        case 'redis': {
            return await redis.checkPassword(password);
        }
        case 'sqlite': {
            return await sequelize.checkPassword(password)
        } 
        default: {
            throw error_helper.ConstantsErrors.invalidStorageType
        }
    }
}

async function savePassword(password) {

    switch (env_config.CONFIG.storageType()) {
        case 'redis': {
            await redis.savePassword(password)
            break;
        }
        case 'sqlite': {
            await sequelize.savePassword(password)
            break
        } 
        default: {
            throw error_helper.ConstantsErrors.invalidStorageType
        }
    }
}

module.exports = {
    checkPassword,
    savePassword,
}