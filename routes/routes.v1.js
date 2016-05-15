var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

  var jsonData = {
  	'name': 'POSEIDON',
  	'api-status':'OK'
  }

  // respond with json data
  res.json(jsonData)
});


router.post('/', function(req, res){

    return res.json(req.body);

});



module.exports = router;
