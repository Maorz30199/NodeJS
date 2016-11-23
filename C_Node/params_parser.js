function parse(req){

  var arreglo_parametros = [],parametros = {};

  if(req.url.indexOf("?") > 0)
  {
    var url_data = req.url.split("?");
    var arreglo_parametros = url_data[1].split("&");
    //[nombre=mauricio,data=algo]
  }

  for (var i = arreglo_parametros.length - 1; i >= 0; i--) {
    var parametro = arreglo_parametros[i];
    // nombre=mauricio
    var param_data = parametro.split("=");
    //[nombre:uriel]
    parametros[param_data[0]] = param_data[1];
    //{nombre:uriel}
  };
  return parametros;
}

module.exports.parse = parse;
