const express = require('express');
const Router = express.Router();
const db = require('../../Firebase/Firebase');

Router.route('/')
.post(function (req, res) {
  const data = {};
  for (const item in req.body) {
    if (item !== "contestID") {
      data[item] = req.body[item];
    }
  }
  console.log(data);
  db.collection("contests").doc(req.body.contestID).set(data).then((result) => {
      console.log("Contest Added Successfully");
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = Router;