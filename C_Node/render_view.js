function render (html_string,parametros){

var variables = html_string.match(/[^\{\}]+(?=\})/g); //Expresión Regular

  for (var i = variables.length - 1; i >= 0; i--) {

    var variable = variables[i];
    //parametros[variable
    html_string = html_string.replace("{"+variables[i]+"}",parametros[variable]);
  };
  return html_string;
}

module.exports.render = render;
