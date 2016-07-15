// var request    = require('request');
// var _ = require('underscore');
var Firebase = require("firebase");
var myFirebaseRef = new Firebase('https://brilliant-inferno-9906.firebaseio.com');
var _ = require('underscore');



exports.hello = function (req, res) {
  res.send("hello to you too")
}

exports.setName = function (req, res) {
  myFirebaseRef.set({
    currentName:req.body.name
  });
  res.json({status:"success", data:{name:req.body.name}});
}

exports.getName = function (req, res) {
  var isSent = false;
  myFirebaseRef.child("currentName").on("value", function(snapshot) {
    if(!isSent){
      isSent = true;
      res.json({status:"success", data:snapshot.val()});
    }
  });
}

exports.setUser = function (req, res) {
  var userObj = {
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    city: req.body.city,
    phone: req.body.phone,
    bbm: req.body.bbm ? req.body.bbm : ''
  }

  var isSent = false;
  myFirebaseRef.child("user").on("value", function(snapshot) {
    if(!isSent){
      isSent = true;
      var data = snapshot.val();
      data = _.each(data, function(v,k,l) { v.id = k });

      var doesDuplicateExist = false;
      _.each(data, function(val, key, list) {
        if (val.username == userObj.username) {
          doesDuplicateExist = true;
        }
      });

      if (doesDuplicateExist) {
        res.status(409).json({status:"failed", message:"username already exist"});
      }
      else {
        var userRef = myFirebaseRef.child("user");
        userRef.push().set(userObj);

        res.json({status:"success", data:userObj});
      }
    }
  });



}

exports.getUser = function (req, res) {
  var isSent = false;
  myFirebaseRef.child("user").on("value", function(snapshot) {
    if(!isSent){
      isSent = true;
      var data = snapshot.val();
      data = _.each(data, function(v,k,l) { v.id = k });
      res.json({status:"success", data:data});
    }
  });
}


exports.setBuyer = function (req, res) {
  var buyerObj = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    image_url: req.body.image_url,
    is_active: 1
  }

  var buyerRef = myFirebaseRef.child("buyer");
  buyerRef.push().set(buyerObj);

  res.json({status:"success", data:buyerObj});
}

exports.getBuyer = function (req, res) {
  var isSent = false;
  myFirebaseRef.child("buyer").on("value", function(snapshot) {
    if(!isSent){
      isSent = true;
      var data = snapshot.val();
      data = _.each(data, function(v,k,l) { v.id = k });
      res.json({status:"success", data:data});
    }
  });
}

exports.editBuyerById = function (req, res) {
  var isSent = false;
  var buyerObj = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    image_url: req.body.image_url,
    is_active: 1
  }
  myFirebaseRef.child("buyer").child(req.params.id).set({

  });
  res.json({status:"success", data: buyerObj});
}

exports.getBuyerById = function (req, res) {
  var isSent = false;
  myFirebaseRef.child("buyer").child(req.params.id).on("value", function(snapshot) {
    if(!isSent){
      isSent = true;
      res.json({status:"success", data:snapshot.val()});
    }
  });
}

exports.setSeller = function (req, res) {
  var sellerObj = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    image_url: req.body.image_url,
    is_active: 1
  }

  var sellerRef = myFirebaseRef.child("seller");
  sellerRef.push().set(sellerObj);

  res.json({status:"success", data:sellerObj});
}

exports.getSeller = function (req, res) {
  var isSent = false;
  myFirebaseRef.child("seller").on("value", function(snapshot) {
    if(!isSent){
      isSent = true;
      var data = snapshot.val();
      data = _.each(data, function(v,k,l) { v.id = k });
      res.json({status:"success", data:data});
    }
  });
}

exports.editSellerById = function (req, res) {
  var isSent = false;
  var sellerObj = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    image_url: req.body.image_url,
    is_active: 1
  }
  myFirebaseRef.child("seller").child(req.params.id).set({

  });
  res.json({status:"success", data: sellerObj});
}

exports.getSellerById = function (req, res) {
  var isSent = false;
  myFirebaseRef.child("seller").child(req.params.id).on("value", function(snapshot) {
    if(!isSent){
      isSent = true;
      res.json({status:"success", data:snapshot.val()});
    }
  });
}

exports.setOffer = function (req, res) {
  console.log('qweqwe');
  console.log(req.body);
  var offerObj = {
    seller: req.body.seller,
    buyer: req.body.buyer,
    image_url: req.body.image_url,
    description: req.body.description,
    weight: req.body.weight,
    price: req.body.price,
    category: req.body.category,
    title: req.body.title,
    is_valid: req.body.is_valid
  }

  var offerRef = myFirebaseRef.child("offer");
  offerRef.push().set(offerObj);

  res.json({status:"success", data:offerObj});
}

exports.getOffer = function (req, res) {
  var isSent = false;
  myFirebaseRef.child("offer").on("value", function(snapshot) {
    if(!isSent){
      isSent = true;
      var data = snapshot.val();
      data = _.each(data, function(v,k,l) { v.id = k });
      res.json({status:"success", data:data});
    }
  });
}

exports.editOfferById = function (req, res) {
  var isSent = false;
  var offerObj = {
    seller: req.body.seller,
    buyer: req.body.buyer,
    image_url: req.body.image_url,
    description: req.body.description,
    weight: req.body.weight,
    price: req.body.price,
    category: req.body.category,
    title: req.body.title,
    is_valid: req.body.is_valid
  }
  myFirebaseRef.child("offer").child(req.params.id).set(offerObj);
  res.json({status:"success", data: offerObj});
}

exports.getOfferById = function (req, res) {
  var isSent = false;
  myFirebaseRef.child("offer").child(req.params.id).on("value", function(snapshot) {
    if(!isSent){
      isSent = true;
      res.json({status:"success", data:snapshot.val()});
    }
  });
}
