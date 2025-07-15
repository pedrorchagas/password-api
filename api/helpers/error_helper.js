const ConstantsErrors = {
    maxLessThanMin: {message: 'O máximo é menor que o mínimo', code: 400},
    limitExceeded: {message: 'O valor máximo é maior que 300', code: 400},
    invalidPattern: {message: 'pattern não valida', code: 400},
    minLimit: {message: 'Valor mínimo deve ser maior ou igual a 5', code: 400},
    cantConnectToRedis: {message: 'Não foi possível se conectar ao redis', code: 500 },
    cantGeneratePassword: {message: 'Não foi possível gerar a sua senha.', code: 500 },
    invalidStorageType: {message: 'O tipo de armazenamento não é válido', code: 503},
    storageConfigNotFound: {message: 'Não foi encontrada a configuração do tipo de armazenamento', code: 503}
}

module.exports = {
    ConstantsErrors,
}