const ConstantsErrors = {
    maxLessThanMin: 'O máximo é menor que o mínimo',
    limitExceeded: 'O valor máximo é maior que 300'
}

async function errorPattern(message, code) {
    let error = new Error({message: message, code: code})
    return error;
}

module.exports = {
    errorPattern,
    ConstantsErrors,
}