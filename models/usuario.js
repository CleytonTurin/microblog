'use strict';

let mongoose =require('../db/mongoose');

let usuario=mongoose.model('usuarios',{

nome: {type: String, required: true},
        nickname: {type: String, required: true, index:{unique:true}},
        email: {type: String, required: true, index:{unique:true}},
        senha: {type: String, required: true}

});

module.exports =usuario;