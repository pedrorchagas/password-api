const {characters, alphabet, numbers, specials} = require('../utils/constants');

function getCharacterList(type) {
    if (type == 'alphabet') return alphabet;
    if (type == 'numbers') return numbers;
    if (type == 'specials') return specials;  
}

function getRandomCharacterList() {
    return getCharacterList(characters[Math.floor(Math.random() * characters.length)]);
}

function getRandomCharacter() {
    let charList = getRandomCharacterList();
    let char = charList[Math.floor(Math.random() * charList.length)];

    return char;
}

function getRamdomCharacterFromList(type) {
    let charList = getCharacterList(type);
    let char = charList[Math.floor(Math.random() * charList.length)];

    return char;
}

module.exports = {
    getCharacterList,
    getRandomCharacterList,
    getRandomCharacter,
    getRamdomCharacterFromList

}