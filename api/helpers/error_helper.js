const ConstantsErrors = {
    maxLessThanMin: {message: 'O máximo é menor que o mínimo', code: 400},
    limitExceeded: {message: 'O valor máximo é maior que 300', code: 400},
    invalidPattern: {message: 'pattern não valida', code: 400},
    minLimit: {message: 'Valor mínimo deve ser maior ou igual a 5', code: 400}
}

module.exports = {
    ConstantsErrors,
}