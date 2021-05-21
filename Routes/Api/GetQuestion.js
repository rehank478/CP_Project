const express = require('express');
const Router = express.Router();
const db = require('../../Firebase/Firebase');

Router.route('/')
.post(function (req, res) {
  db.collection("problems").doc(req.body.id).get().then((doc) => {
      const data = {};
      for (const item in doc._fieldsProto) {
        if (item[0] !== "H") {
          data[item] = doc._fieldsProto[item];
        }
      }
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = Router;