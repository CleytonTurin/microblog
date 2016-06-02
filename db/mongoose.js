'use strict';
let mongoose = require('mongoose');
let debug = require('debug')('curso-node:mongoose');
let host = 'localhost';
let port =  27017;
let database = 'microblog';


var connection_string=`${host}:${port}/${database}`;


// default to a 'localhost' configuration:

// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}



mongoose.connect(connection_string);
let db = mongoose.connection;

module.exports = mongoose;