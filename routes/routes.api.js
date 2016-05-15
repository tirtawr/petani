var express = require('express');
var router = express.Router();
var apiController = require('../controllers/api.controller.js')

router.get('/hello', apiController.hello);

router.post('/name', apiController.setName);

router.get('/name', apiController.getName)


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
