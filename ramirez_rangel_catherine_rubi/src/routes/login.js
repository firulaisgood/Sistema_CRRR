const express = require('express');
const LoginController = require('../controllers/LoginController');

const router = express.Router();
// se definen las rutas
router.get('/login', LoginController.index);
router.get('/register', LoginController.register);
router.get('/registerP', LoginController.registerP);
router.post('/register', LoginController.storeUser);
router.post('/auth', LoginController.auth);
router.get('/logout', LoginController.logout);

module.exports = router;