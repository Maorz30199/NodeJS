var http = require("http"),
    fs= require("fs");

var html = fs.readFileSync("./index.html");// versión sincrona

http.createServer(function(req, res){
  res.write(html);
  res.end();

}).listen(8080);
