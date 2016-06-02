'use strict'

let usuarioModel = require('../models/usuario');
let debug=require('debug')('microblog:controllers/usuario');

let UsuarioController={
      
                  login: function(req, res){
                        
                        
                        if(req.session.usuario){  
                        res.redirect("/");      
                          }else{  
                      res.render('usuario/login',{ title: 'Login', showLogin:true });
                        }

              },
   
              loginAction: function(req, res){
                        
                                          req.assert(['usuario', 'nickname'], 'Insira um apelido').notEmpty();
                                          req.assert(['usuario', 'senha'], 'Insira uma senha de no mínimo 6 caracteres').len(6, 20);
                              
                                                      let errors = req.validationErrors();
                                                      
                                          if(!errors){
                                                
                                                var query = {nickname: req.body.usuario.nickname, senha: req.body.usuario.senha};
                              
                                                usuarioModel.findOne(query).select('nome email nickname').exec(function(error, usuario){
                                                      if(usuario){
                                                            req.session.usuario = usuario;
                                                            console.log(req.session.usuario.nome,' logado');
                                                            
                                                            res.redirect('/');
                                                      }else{
                                                            res.render('usuario/login', {'errors': [{'msg': 'Nickname ou Senha inválida'}],showLogin:true})
                                                      }
                                                });
                                                }else{
                                                res.render('usuario/login', {'errors': errors,showLogin:true});
                                                }
                                                      
                                                      
                                                            
                                          },
                                          cadastro: function(req, res){
                                          res.render("usuario/cadastro",{ title: 'Login', showLogin:true });
            },
            
            cadastroAction: function(req, res){
              
                                           let usuario = req.body.usuario;
                                                


                                          req.assert(['usuario', 'nome'], 'Insira seu nome completo').notEmpty();
                                          req.assert(['usuario', 'nickname'], 'Insira um apelido').notEmpty();
                                          req.assert(['usuario', 'email'], 'Insira uma conta de e-mail válida').len(10, 50).isEmail();
                                          req.assert(['usuario', 'senha'], 'Insira uma senha de no mínimo 6 caracteres').len(6, 20);
                                          req.assert(['usuario', 'conf_senha'], 'Confira sua senha').len(6,20);
                                          req.assert(['usuario', 'conf_senha'], 'As senhas não são compatíveis').equals(req.body.usuario.senha);
                              

                                                let errors = req.validationErrors();
                                                            if(errors){
                                                                  
                                                      res.render("usuario/cadastro", {'errors': errors,showLogin:true});
                                                }else{
                                                      
                                                
                                                usuarioModel.create(req.body.usuario, function(error, usuario){
                                                      if(error){
                                                            console.log(error);
                                                            res.render("usuario/cadastro", {'errors': [{'msg': error.err}],showLogin:true});
                                                      }else{
                                                            res.render("usuario/login",{showLogin:true});
                                                      }
                                                });
                                                            
                                          
                                                }
            },
            
            logout: function(req, res){
                if(req.session.usuario){  
                       console.log(req.session.usuario.nome,' deslogado');
                  req.session.destroy(function () {
                        res.redirect("/");      
            });
                 
                }else{
                      
                      res.redirect('/');
                }
             }
            
}
module.exports = UsuarioController;