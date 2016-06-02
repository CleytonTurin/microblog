'use strict'
let express = require('express');
let router = express.Router();



        let nweet = require('../controllers/nweet');
   

        router.post("/submit", nweet.submit);
        router.get("/posts", nweet.posts);
        router.get('/remove/:id',nweet.remove);


module.exports = router;
