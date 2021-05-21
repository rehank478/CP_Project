const express = require('express');
const Router = express.Router();
const db = require('../../Firebase/Firebase');

Router.route('/')
.post(function (req, res) {
  db.collection("problems").doc(req.body.qid).set(req.body).then((result) => {
      console.log("Question uploaded successfully");
    });
});

module.exports = Router;