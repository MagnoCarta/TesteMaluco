const lista_exemplos = document.getElementById("exemplos");
httpGetAsync('https://projeto-orbit.firebaseio.com/cabecalhos.json', function(texto){
  // Transforma o texto em um objeto
  var cabecalhos = JSON.parse(texto);
  var cabecalhoAtual = cabecalhos.cabecalho_01;

  Object.values(cabecalhoAtual.exemplos).forEach(function(textoExemplo)
  {
      var item_lista = document.createElement("li");
      item_lista.innerHTML = textoExemplo;
      item_lista.style.listStyleType = "disc";
      lista_exemplos.appendChild(item_lista);
  });
});

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

/*
function httpGetAsync(theUrl) // Tentativa de fazer a função não precisar chamar outra na mesma hora
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            return xmlHttp.responseText;
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}*/

/* Não precisa de outra função, mas essa função não é muito recomendada (deprecated)
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}*/
