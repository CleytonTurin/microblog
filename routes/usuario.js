'use strict'
let express = require('express');
let router = express.Router();



        let usuario = require('../controllers/usuario');
   
        router.get("/login", usuario.login);
        router.get("/logout", usuario.logout);
        router.post("/login/processa", usuario.loginAction);
        router.get("/cadastro", usuario.cadastro);
        router.post("/cadastro", usuario.cadastroAction);


module.exports = router;
