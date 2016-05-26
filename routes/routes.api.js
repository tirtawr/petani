var express = require('express');
var router = express.Router();
var apiController = require('../controllers/api.controller.js')

router.get('/hello', apiController.hello);

router.post('/name', apiController.setName);

router.get('/name', apiController.getName);

router.post('/buyer', apiController.setBuyer);

router.get('/buyer', apiController.getBuyer);

router.get('/buyer/:id', apiController.getBuyerById);

router.put('/buyer/:id', apiController.editBuyerById);

router.post('/seller', apiController.setSeller);

router.get('/seller', apiController.getSeller);

router.get('/seller/:id', apiController.getSeller);

router.put('/seller/:id', apiController.editSellerById);

router.post('/offer', apiController.setOffer);

router.get('/offer', apiController.getOffer);

router.get('/offer/:id', apiController.getOffer);

router.put('/offer/:id', apiController.editOfferById);


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
