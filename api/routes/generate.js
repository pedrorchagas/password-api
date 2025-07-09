var express = require('express');
var router = express.Router();
var passwordController = require('../controllers/generate_password')

router.get('/', async function(req, res, next) {
    try {
        let password = await passwordController.generatePassword(req)
        res.status(200).send(password)
    } catch (error) {
        console.log(error)
        res.status(error.code).send(error.message)
    }
});

module.exports = router;