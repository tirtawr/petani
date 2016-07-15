var express = require('express');
var router = express.Router();
var apiController = require('../controllers/api.controller.js')

router.get('/hello', apiController.hello);

router.post('/name', apiController.setName);

router.get('/name', apiController.getName);

router.post('/user', apiController.setUser); //Deprecated

router.get('/user', apiController.getUser); //Deprecated

router.post('/buyer', apiController.setBuyer); //Deprecated

router.get('/buyer', apiController.getBuyer); //Deprecated

router.get('/buyer/:id', apiController.getBuyerById); //Deprecated

router.put('/buyer/:id', apiController.editBuyerById); //Deprecated

router.post('/seller', apiController.setSeller); //Deprecated

router.get('/seller', apiController.getSeller); //Deprecated

router.get('/seller/:id', apiController.getSeller); //Deprecated

router.put('/seller/:id', apiController.editSellerById); //Deprecated

router.post('/offer', apiController.setOffer);

router.get('/offer', apiController.getOffer);

router.get('/offer/:id', apiController.getOffer);

router.put('/offer/:id', apiController.editOfferById);


router.get('/', function(req, res) {

  var jsonData = {
  	'name': 'PETANI',
  	'api-status':'OK'
  }

  // respond with json data
  res.json(jsonData)
});


router.post('/', function(req, res){

    return res.json(req.body);

});



module.exports = router;
