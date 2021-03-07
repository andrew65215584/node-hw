const express = require('express');
const router = express.Router();

const controllerUsers = require('../../controllers/users');

router.post('/registration', controllerUsers.reg);
router.get('/confirm/:token', controllerUsers.verifiedTokenAfterRegister);

router.post('/login', controllerUsers.login);
router.post('/logout', controllerUsers.logout);

module.exports = router;
