const error_helper = require('../helpers/error_helper')

const CONFIG = {
    storageType: () => {
        let value = process.env.STORAGE_TYPE
        if (typeof value === 'undefined') throw error_helper.ConstantsErrors.storageConfigNotFound;
        else {
            value.toLowerCase()
            return value
        }
    }
}

module.exports = {
    CONFIG
}