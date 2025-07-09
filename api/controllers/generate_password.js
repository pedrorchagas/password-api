const characters_service = require('../services/characters');
const error_helper = require('../helpers/error_helper');

async function generatePassword(res) {
    const pattern = (typeof req.query.pattern === 'string') ? req.query.pattern : false;
    const length = isNaN(parseInt(req.query.length)) ? false : parseInt(req.query.length);
    const min = isNaN(parseInt(req.query.min)) ? 5 : parseInt(req.query.min);
    const max = isNaN(parseInt(req.query.max)) ? 15 : parseInt(req.query.max);
    const prefix = (typeof req.query.prefix === 'string') ? req.query.prefix : false;
    const suffix = (typeof req.query.suffix === 'string') ? req.query.suffix : false;

    let password = '';
    let passwordSize = 0;
    let passwordInfo = {};

    // tratamento de certos erros que pode acontecer
    if (min > max) {
        throw error_helper.ConstantsErrors.maxLessThanMin;
    }
    if (max > 300) {
        throw error_helper.errorPattern(error_helper.ConstantsErrors.limitExceeded, 400);
    }

    if (pattern) {
        // se o parâmetro de pattern for definido, isso irá acontecer
        passwordSize = pattern.length;

        for(let i = 0; i < passwordSize; i++){
            let charType = pattern[i];
            
            // transforma as letras nos nomes de cada lista
            switch(charType){
                case 'N':
                case 'n': {
                    charType = 'numbers';
                    break;
                }
                case 'L':
                case 'l': {
                    charType = 'alphabet';
                    break;
                }
                case 'S':
                case 's': {
                    charType = 'specials';
                    break;
                }
                default: {
                    throw new Error({error: 'pattern não valida'})
                }
            }

            let char = characters_service.getRamdomCharacterFromList(charType);
            password += char; 

        }
    }
    else {
        // caso não tenha nenhuma pattern isso irá acontecer
        if (length) {
            // se tiver definido a length isso irá acontecer
            passwordSize = length;

        } else {
            // se não tiver definido a length isso irá acontecer
            do {
                passwordSize = Math.floor(Math.random() * max);
            }
            while(passwordSize < min || passwordSize > max);
        }

        // aqui ele cria a senha baseado no tamanho da senha = passwordSize
        for(let i = 0; i <= passwordSize; i++) {
            let char = characters_service.getRandomCharacter();
            password += char;
        }


    }

    // caso tenha prefixo ou sufixo ele será adicionado aqui
    if(prefix) {
        password = prefix + password;
        passwordSize += prefix.length;
    }
    if(suffix){
        password = password + suffix;
        passwordSize += suffix.length;
    }
    
    // adicionar as informações sobre a senha:
    passwordInfo.lenght = passwordSize;
    passwordInfo.pattern = pattern;
    passwordInfo.prefix = prefix;
    passwordInfo.suffix = suffix;
    
    return {password: password, passwordInfo: passwordInfo};
}

module.exports = {
    generatePassword,
}