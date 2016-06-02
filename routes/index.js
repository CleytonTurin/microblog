'use strict'
let express = require('express');
let router = express.Router();

/* GET env values
router.get('/env', function (req, res) {
  var content = 'Version: ' + process.version + '\n<br/>\n' +
    'Env: {<br/>\n<pre>';
  //  Add env entries.
  for (var k in process.env) {
    content += '   ' + k + ': ' + process.env[k] + '\n';
  }
  content += '}\n</pre><br/>\n';
  res.send('<html>\n' +
    '  <head><title>Node.js Process Env</title></head>\n' +
    '  <body>\n<br/>\n' + content + '</body>\n</html>');
});
 */

router.get('/', function(req, res, next) {
  
  res.redirect("/nweet/posts");
  
});


router.use('/usuario',require('./usuario'));
router.use('/nweet',require('./nweet'));



module.exports = router;
