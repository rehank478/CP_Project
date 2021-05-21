const express = require('express');
const Router = express.Router();
var fs = require("fs");
const { c, cpp, python, java } = require("compile-run");
const db = require('../../Firebase/Firebase');



Router.route('/').post(function (req, res) {
  var file_ext = req.body.file_ext || "cpp";
  var fileName = "./temp/" + "Main." + file_ext;
  fs.writeFile(fileName, req.body.code, function (err) {
    // console.log(err);
  });

  var language = cpp;
  switch (file_ext) {
    case "py":
      language = python;
      break;
    case "c":
      language = c;
      break;
    case "java":
      language = java;
      break;
    default:
      language = cpp;
  }

  db.collection("problems").doc(req.body.questionID).get().then(async (doc) => {
      var brr = [],arr = [];
      var ac = 0,wa = 0;
      if(typeof doc._fieldsProto.sample !== 'undefined') arr = doc._fieldsProto.sample.arrayValue.values;
      if(typeof doc._fieldsProto.hidden !== 'undefined') brr = doc._fieldsProto.hidden.arrayValue.values;
      const n = arr.length;
      const m = brr.length;
      for(var i=0;i<n;i=i+2){
        var users_txt = "";
        var judge_txt = "";

        // Checking users solution over sample testcases

        let resultPromise = language.runFile(fileName, { stdin: arr[i].stringValue });
        await resultPromise.then(async (result) => {
          // console.log(result);
            var a = result.stdout.substr(0,result.stdout.length);
            a = a.replace(/^\s+|\s+$/g, '');
            var b = arr[i+1].stringValue.substr(0,arr[i+1].stringValue.length);
            b = b.replace(/^\s+|\s+$/g, '');
            console.log(a);
            console.log(b);
            if(a === b) ac = ac + 1;
            else wa = wa + 1;
          }).catch((err) => { // promise catch
            console.log("RE");
          });
          
      } 
      

      // Checking users solution over hidden testcases

      for(var i=0;i<m;i=i+2){
        var users_txt = "";
        var judge_txt = "";
        let resultPromise = language.runFile(fileName, { stdin: brr[i].stringValue });
        await resultPromise.then((result) => {
            var a = result.stdout.substr(0,result.stdout.length);
            a = a.replace(/^\s+|\s+$/g, '');
            var b = brr[i+1].stringValue.substr(0,brr[i+1].stringValue.length);
            b = b.replace(/^\s+|\s+$/g, '');
            console.log(a);
            console.log(b);
            if(a === b) ac = ac + 1;
            else wa = wa + 1;
          }).catch((err) => { // promise catch
            console.log("RE");
        });
      }


      res.send("TestCase Accepted : " + ac + "&" + "Wrong Answer : " + wa);
      
    }).catch((err) => { //firebase catch
      console.log(err);
    });
});

module.exports = Router;



