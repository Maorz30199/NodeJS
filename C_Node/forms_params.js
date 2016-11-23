var http = require("http"),
    fs= require("fs");
    parser = require("./params_parser.js");
    rende = require("./render_view.js");

var p = parser.parse;
var r = rende.render;


http.createServer(function(req,res){

  if(req.url.indexOf("favicon.ico") > 0) {return;}

  fs.readFile("./index.html",function(err,html){

    var html_string = html.toString();
    var nombre = "";
    var parametros = p(req);

    res.writeHead(200,{"Content-Type":"text/html"})
    res.write(r(html_string,parametros));
    res.end();
  });
}).listen(8080);// versión asincrona
