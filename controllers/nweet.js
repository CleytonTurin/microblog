'use strict'

let nweetModel = require('../models/nweet');
let debug=require('debug')('microblog:controllers/nweet');

let nweetController={
      
                  submit: function(req, res){
                        
                        req.assert(['nweet', 'texto'], 'Seu nweet excedeu os 140 chars!').len(1,140);
   
                        var errors = req.validationErrors();
   
                        if(errors){
                                res.render('nweet/microBlog', {usuario:req.session.usuario, showLogin:false,'errors': errors});     
                         }else{

                              req.body.nweet.autor = req.session.usuario._id;
            
                              nweetModel.create(req.body.nweet, function(error, nweet){
                                    console.log(req.session.usuario.nickname,' postou');
                                    res.redirect("/");
                              });
                         }

                  },
                  
                  posts: function(req, res){
                        
                        nweetModel.find().populate('autor').sort( [['data', 'descending']] ).limit(30).exec(function( error, nweets ){
                              res.render('nweet/microBlog', {usuario:req.session.usuario, "nweets": nweets});
                        });                              
                        
                  },
                  remove: function(req, res){
                             let query ={
                                    _id:req.params.id
                              };
                        nweetModel.remove(query).exec(function( error, nweets ){
                               res.redirect("/");
                        });                              
                        
                  },
}

module.exports = nweetController;