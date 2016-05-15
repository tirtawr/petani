// var request    = require('request');
// var _ = require('underscore');
var Firebase = require("firebase");
var myFirebaseRef = new Firebase(process.env.FIREBASE_URL);


exports.hello = function (req, res) {
  res.send("hello to you too")
}

exports.setName = function (req, res) {
  myFirebaseRef.set({
    currentName:req.body.name
  });
  res.json({status:"success", data:{name:req.body.name}})
}

exports.getName = function (req, res) {
  myFirebaseRef.child("currentName").on("value", function(snapshot) {
    console.log(snapshot.val());
    res.json({status:"success", data:{name:snapshot.val()}})
  });
}
