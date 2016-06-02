'use strict';

let mongoose =require('../db/mongoose');

var Schema = mongoose.Schema;

let nweet=mongoose.model('nweets',{

          autor: {type: Schema.ObjectId, required: true, ref: "usuarios"},
          texto: {type: String, required: true},
          data:  {type: Date, default: Date.now}


});

module.exports =nweet;