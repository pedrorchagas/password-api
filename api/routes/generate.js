var express = require('express');
var router = express.Router();
var passwordController = require('../controllers/generate_password')

router.get('/', async function(req, res, next) {
    try {
        let password = await passwordController.generatePassword(req)
        res.status(200).send(password)
    } catch (error) {
        res.status(error.code || 500 ).send({error: error.message || error})
    }
});

module.exports = router;