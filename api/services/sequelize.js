const { Sequelize } = require('sequelize');
const Password = require('../models/password_model');

async function createConnection() {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'database.sqlite',
    })

    try {
        await sequelize.authenticate();
        console.log('Conexão foi estabelecida com sucesso!')
        return sequelize
    } catch(error) {
        console.error(error)
    }
}

async function checkPassword(password) {
    try {
        const sequelize = await createConnection();
        let result = await Password(sequelize, Sequelize.DataTypes).findOne({where: {password: password}})
        if (result.dataValues.status) return true
        else return false
    } catch(error) {
        return false
    } 
}

async function savePassword(password) {
    const sequelize = await createConnection()

    let oldPasswords = await Password(sequelize, Sequelize.DataTypes).findAll()

    if ( oldPasswords.length >= 50) {
        await Password(sequelize, Sequelize.DataTypes).destroy({where: { id : oldPasswords[0].dataValues.id}})
    }

    await Password(sequelize, Sequelize.DataTypes).create({
        password: password,
        status: true, 
    })
}

module.exports = {
    checkPassword,
    savePassword,
    createConnection,
}