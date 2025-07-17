var express = require('express');
var router = express.Router();
var passwordController = require('../controllers/generate_password')

router.get('/', async function(req, res, next) {
    res.render('index', {
        title: 'Password-api'
    })
});

module.exports = router;