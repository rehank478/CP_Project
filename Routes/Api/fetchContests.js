const express = require('express');
const Router = express.Router();
const db = require('../../Firebase/Firebase');

Router.route('/')
.get(function (req, res) {
  var data = {};
  var n = 1;
  db.collection("contests").get().then((result) => {
      result.docs.map((val) => {
        data = { ...data, [val._ref._path.segments[1]]: val._fieldsProto };
      });
      res.send(data);
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = Router;