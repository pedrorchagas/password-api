const {characters, alphabet, numbers, specials} = require('../utils/constants');

function getCharacterList(type) {
    if (type == 'alphabet') return alphabet;
    if (type == 'numbers') return numbers;
    if (type == 'specials') return specials;  
}

function getRandomCharacterList() {
    return getCharacterList(characters[Math.floor(Math.random() * characters.length)]);
}

function getRandomCharacter(upper=false, down=false) {
    let charList = getRandomCharacterList();
    let char = charList[Math.floor(Math.random() * charList.length)];

    if (typeof char === 'string') {
        if (upper + down === 2 || upper + down === 0) {
            char = Math.floor(Math.random() * 2) ? char.toUpperCase() : char;
        } else {
            if (upper && !down) {
                char = char.toUpperCase();
            }
        }
    }

    return char;
}

function getRamdomCharacterFromList(type, upper=false, down=false) {
    let charList = getCharacterList(type);
    let char = charList[Math.floor(Math.random() * charList.length)];

    // define se letra será maiúscula ou minúscula
    if (type === 'alphabet') {
        if (upper + down === 2 || upper + down === 0) {
            char = Math.floor(Math.random() * 2) ? char.toUpperCase() : char;
        } else {
            if (upper && !down) {
                char = char.toUpperCase();
            }
        }
    }

    return char;
}

module.exports = {
    getCharacterList,
    getRandomCharacterList,
    getRandomCharacter,
    getRamdomCharacterFromList

}