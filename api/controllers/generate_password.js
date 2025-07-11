const characters_service = require('../services/characters');
const error_helper = require('../helpers/error_helper');
const redis_service = require('../services/redis')

async function generatePassword(req) {
    let pattern = (typeof req.query.pattern === 'string') ? req.query.pattern : false;
    let length = isNaN(parseInt(req.query.length)) ? false : parseInt(req.query.length);
    let min = isNaN(parseInt(req.query.min)) ? 7 : parseInt(req.query.min);
    let max = isNaN(parseInt(req.query.max)) ? 15 : parseInt(req.query.max);
    let prefix = (typeof req.query.prefix === 'string') ? req.query.prefix : false;
    let suffix = (typeof req.query.suffix === 'string') ? req.query.suffix : false;
    let upper = isNaN(parseInt(req.query.upper)) ? false : true;
    let down = isNaN(parseInt(req.query.down)) ? false : true;
    try {
        var attempts = 0;
        do {
            if (attempts >= 10) {
                throw error_helper.ConstantsErrors.cantGeneratePassword;
            }
            var password = '';
            let passwordSize = 0;
            var passwordInfo = {};

            // tratamento de certos erros que pode acontecer
            if (min > max) {
                throw error_helper.ConstantsErrors.maxLessThanMin;
            }
            if (max > 300) {
                throw error_helper.ConstantsErrors.limitExceeded;
            }
            if (min < 7) {
                throw error_helper.ConstantsErrors.minLimit;
            }

            if (pattern) {
                // se o parâmetro de pattern for definido, isso irá acontecer
                passwordSize = pattern.length;

                for(let i = 0; i < passwordSize; i++){
                    let charType = pattern[i];
                    let upper = false;
                    let down = false;
                    
                    // transforma as letras nos nomes de cada lista
                    switch(charType){
                        case 'A':
                        case 'a': {
                            charType = 'alphabet';
                            break;
                        }
                        case 'N':
                        case 'n': {
                            charType = 'numbers';
                            break;
                        }
                        case 'L': {
                            upper = true;
                            charType = 'alphabet';
                            break;
                        }
                        case 'l': {
                            down = true;
                            charType = 'alphabet';
                            break;
                        }
                        case 'S':
                        case 's': {
                            charType = 'specials';
                            break;
                        }
                        default: {
                            throw error_helper.ConstantsErrors.invalidPattern;
                        }
                    }

                    let char = characters_service.getRamdomCharacterFromList(charType, upper, down);
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
                    let char = characters_service.getRandomCharacter(upper, down);
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
            passwordInfo.upper = upper;
            passwordInfo.down = down;
            
            attempts +=1
        } while(await redis_service.checkPassword(password)); 
        await redis_service.savePassword(password, passwordInfo);
        return {password: password, passwordInfo: passwordInfo};

    } catch(error) {
        console.log('aaaa', error)
        throw error;
    } 
}

module.exports = {
    generatePassword,
}