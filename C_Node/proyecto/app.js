var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
//var session = require("cookie-session");
var cookieSession = require("cookie-session");
var router_app = require("./routes_app");
var session_middlewares = require("./middlewares/session");
var app = express();

app.use("/public",express.static('public'));
app.use(bodyParser.json()); // para peticiones aplication/json
app.use(bodyParser.urlencoded({extended: true}));
/*app.use(session({
  secret: "123byuhbsdah12",
  resave: false,
  saveUninitialized: false
}));*/
app.use(cookieSession({
  name: "session",
  keys: ["llave-1","llave-2"]
}));
app.set("view engine","jade");

app.get("/",function(req,res){
  console.log(req.session.user_id);
  res.render("index");
});

app.get("/signup",function(req,res){
  User.find(function(err,doc){
      console.log(doc);
      res.render("signup");
  });
});

app.post("/users",function(req,res){
  var user = new User({
    email: req.body.email, password: req.body.password,
    password_confirmation: req.body.password_confirmation,
    username: req.body.username
  });
  console.log(user.password_confirmation);
  console.log("Contraseña: " + req.body.password);
  console.log("email: " + req.body.email);

  user.save().then(function(us){
    res.send("Datos se han guardado");
  },function(err){
    if(err){
      console.log(String(err));
      res.send("Información no ha sido almacenada");
    }
  });
});

app.get("/login",function(req,res){
  User.find(function(err,doc){
      res.render("login");
  });
});

app.post("/sessions",function(req,res){

  User.findOne({email: req.body.email, password: req.body.password},function(err,user){
    req.session.user_id = user._id;
    res.redirect("/app")
  });
});
app.use("/app",session_middlewares);
app.use("/app",router_app);
app.listen(8080);
