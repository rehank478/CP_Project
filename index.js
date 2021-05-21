const express = require("express");
const app = express();
const db = require('./Firebase/Firebase')
app.use(express.urlencoded({ extended: true }));

app.use(require('./Routes'));


app.get("/", function (req, res) {
  res.send("<h1>CPIIITK</h1>");
  // res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 8001;
app.listen(port,function(){
    console.log("Server is up and running on port " + port);
});