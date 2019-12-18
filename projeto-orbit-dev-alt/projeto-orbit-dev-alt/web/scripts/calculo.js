
//Classe Monomio, base de todo o processo de análise.
class Monomio {
  constructor(_coeficiente = 1  ,_incognitas = [],_expoenteIncognitas = []){
      this._coeficiente = _coeficiente; //atributo do tipo float
      this._incognitas = _incognitas; //atributo do tipo lista de strings
      this._expoenteIncognitas = _expoenteIncognitas; //atributo do tipo lista de floats
      
  }
}

//Classe Polinomio que reune monomios de forma a podê-los escrever de forma mais fácil e organizada.
class Polinomio{
  constructor(_monomio = []){
      this._monomio = _monomio;//atributo do tipo lista de monomios
  }
}

function listasIguais(lista1, lista2) {

// checar se as listas possuem o mesmo tamanho
if (lista1.length !== lista2.length) return false;

// checar se todos os itens existem e se estão na mesma ordem
for (var i = 0; i < lista1.length; i++) {
  if (lista1[i] !== lista2[i]) return false;
}

// se tudo estiver bem, é porque as listas são iguais
return true;

};

//Essa função será responsável por somar os monomios iguais em apenas um lado da equação
function somarMonomiosParte1(ListaAnalise){
  let a , b ;
            
  for(a=0 ; a < ListaAnalise.length; a++){
      if(typeof ListaAnalise[a] !== "undefined"){
       //Até aqui será pego um monomio da lista de monomios de um dos lados da equação e verificado se ele existe
        for(b = 0 ; b < ListaAnalise.length; b++){
          if(typeof ListaAnalise[b] !== "undefined" && !Object.is(ListaAnalise[a],ListaAnalise[b])){
              //Até aqui será pego outro monomio dessa mesma lista, verificado se ele existe e se ele não é o mesmo monomio escolhido anteriormente
              if(listasIguais(ListaAnalise[a]._incognitas,ListaAnalise[b]._incognitas) && listasIguais(ListaAnalise[a]._expoenteIncognitas,ListaAnalise[b]._expoenteIncognitas) || !ListaAnalise[a]._incognitas.length && !ListaAnalise[b]._incognitas.length){
                  //Aqui será verificado se os expoentes e incógnitas dos dois monomios escolhidos são iguais ou se ambas essas listas não possuem nenhum elemento
                 ListaAnalise[a]._coeficiente += ListaAnalise[b]._coeficiente;
                 ListaAnalise = ListaAnalise.splice(b,1);
                 //Até aqui será somado os dois coeficientes dos dois monomios de mesmas incógnitas e expoentes e descartado da lista o segundo monomio escolhido
                 //que não existe mais
              if(!ListaAnalise[a]._coeficiente){
                  ListaAnalise = ListaAnalise.splice(a,1);
                  //Se a soma anteriormente calculada for 0 , então o primeiro monomio deve ser descartado também
              }
              }

          }
        }
      }
  }
  return ListaAnalise;
  // retorna a nova lista sem monomios repetidos
}

// Essa função é responsável por somar os monomios iguais dos dois lados da equação
function somarMonomiosParte2(ListaAnalise1,ListaAnalise2){
  let a , b ;
            
  for(a=0 ; a < ListaAnalise1.length; a++){
      if(typeof ListaAnalise1[a] !== "undefined"){
        for(b = 0 ; b < ListaAnalise2.length; b++){
          if(typeof ListaAnalise2[b] !== "undefined" && !Object.is(ListaAnalise1[a],ListaAnalise2[b])){
              if(listasIguais(ListaAnalise1[a]._incognitas,ListaAnalise2[b]._incognitas) && listasIguais(ListaAnalise1[a]._expoenteIncognitas,ListaAnalise2[b]._expoenteIncognitas) || !ListaAnalise1[a]._incognitas.length && !ListaAnalise2[b]._incognitas.length){
                 ListaAnalise1[a]._coeficiente -= ListaAnalise2[b]._coeficiente;
                 ListaAnalise2 = ListaAnalise2.splice(b,1);
                 if(!ListaAnalise1[a]._coeficiente){
                  ListaAnalise1 = ListaAnalise1.splice(a,1);
              }
              }

          }
        }
      }
  }
  return (ListaAnalise1,ListaAnalise2);
}

function organizarPolinomio(ListaAnalise1,ListaAnalise2){
  let a , b , c, d;
  listaDefinitiva1 = [];
  listaDefinitiva2 = [];
      
  for(a=0 ; a < ListaAnalise1.length; a++){
      if(!ListaAnalise1[a]._incognitas.length){
          ListaAnalise1[a]._coeficiente = -ListaAnalise1[a]._coeficiente
          listaDefinitiva2.push(ListaAnalise1[a]);    
  }
      else{
          listaDefinitiva1.push(ListaAnalise1[a]); 
      }
}
  
  for(b = 0 ; b < ListaAnalise2.length; b++){
      if(ListaAnalise2[b]._incognitas.length){
          ListaAnalise2[b]._coeficiente = -ListaAnalise2[b]._coeficiente
          listaDefinitiva1.push(ListaAnalise2[b]);
      }
      else{
          listaDefinitiva2.push(ListaAnalise2[b]);   
      }
  }
  while(ListaAnalise1.length) {
      ListaAnalise1.pop();
  }
  while(ListaAnalise2.length) {
      ListaAnalise2.pop();
  }
  for(c = 0 ; c < listaDefinitiva1.length ; c++){
      ListaAnalise1.push(listaDefinitiva1[c]);
  }
  for(d = 0 ; d < listaDefinitiva2.length ; d++){
      ListaAnalise2.push(listaDefinitiva2[d]);
  }
  return (ListaAnalise1,ListaAnalise2);
}

function organizarSinais(ListaAnalise1,ListaAnalise2){
  let a , b;
  
  if(ListaAnalise1[0]._coeficiente < 0){
     for(a = 0 ; a < ListaAnalise1.length ; a++){
         ListaAnalise1[a]._coeficiente = -ListaAnalise1[a]._coeficiente;
     }
     for(b = 0 ; b < ListaAnalise2.length ; b++){
      ListaAnalise2[b]._coeficiente = -ListaAnalise2[b]._coeficiente;
     }
  }
}

//Classe Cabeçalho cujos objetos serão responsáveis por povoar a tela "Calculadora" .
class Cabecalho{
  constructor(_assunto, _materia, _formulaEsquerda = [], _formulaDireita = [], _exemplos = [],_nomeParametros = []){
      this._assunto = _assunto;//atributo do tipo string
      this._materia = _materia;//atributo do tipo string
      this._formulaEsquerda = _formulaEsquerda;//atributo do tipo lista de monomios que está do lado esquerdo da igualdade
      this._formulaDireita = _formulaDireita; //atributo do tipo lista de monomios que está do lado direito da igualdade
      this._exemplos = _exemplos;//atributo do tipo lista de strings
      this._nomeParametros = _nomeParametros;//atributo do tipo lista de strings
   }
   aplicarValorCompleto(_ListaMonomio1,_ListaMonomio2,_dicionario ={}){
      let i, k, l,  letra = 0,  res = 1, res2 = 0;
      let alfabeto = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
      let alfabetoInverso = ["1/a","1/b","1/c","1/d","1/e","1/f","1/g","1/h","1/i","1/j","1/k","1/l","1/m","1/n",
                             "1/o","1/p","1/q","1/r","1/s","1/t","1/u","1/v","1/w","1/x","1/y","1/z"]
      let keyCount;

      for(i = 0 ; i < ListaMonomio1.length; i++){

          for(k = 0,  keyCount = Object.keys(ListaMonomio1[i]._incognitas).length;  k < keyCount; k++){
              for(l = 0; l < alfabeto.length ; l++){
                  if(alfabeto[l] == ListaMonomio1[i]._incognitas[k]){
                      let valor = _dicionario[alfabeto[l]];
                      letra = Math.pow(valor,ListaMonomio1[i]._expoenteIncognitas[k]);
                      res = res*letra;
                  }
              }
              for(l = 0; l < alfabetoInverso.length ; l++){
                  if(alfabetoInverso[l] == ListaMonomio1[i]._incognitas[k]){
                      let valor = _dicionario[alfabeto[l]];
                      letra = Math.pow(valor,ListaMonomio1[i]._expoenteIncognitas[k]);
                      res = res*(1/letra);
                  }

               }
              }
              res = res*ListaMonomio1[i]._coeficiente;
              res2 += res;
              res = 1;
      }

      for(i = 0 ; i < ListaMonomio2.length; i++){

          for(k = 0,  keyCount = Object.keys(ListaMonomio2[i]._incognitas).length;  k < keyCount; k++){
              for(l = 0; l < alfabeto.length ; l++){
                  if(alfabeto[l] == ListaMonomio2[i]._incognitas[k]){
                      let valor = _dicionario[alfabeto[l]];
                      letra = Math.pow(valor,ListaMonomio2[i]._expoenteIncognitas[k]);
                      res = res*letra; 
                  }
              }
              for(l = 0; l < alfabetoInverso.length ; l++){
                  if(alfabetoInverso[l] == ListaMonomio1[i]._incognitas[k]){
                      let valor = _dicionario[alfabetoInverso[l]];
                      letra = Math.pow(valor,ListaMonomio1[i]._expoenteIncognitas[k]);
                      res = res*(1/letra);
               }
              }
               res = res*ListaMonomio1[i]._coeficiente;
               res2 -= res;
               res = 1;
  
      }
  }

      return console.log(Math.round(res2*100)/100);
  }
   
  aplicarValorParcial(_ListaMonomio1, _ListaMonomio2,_dicionario ={}){
      let i, k, l, m, letra = 0,  res = 1, res2 = 0;
      let alfabeto = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","V0","Vf","w","x","y","z"]
      let alfabetoInverso = ["1/a","1/b","1/c","1/d","1/e","1/f","1/g","1/h","1/i","1/j","1/k","1/l","1/m","1/n","1/o",
                             "1/p", "1/q","1/r","1/s","1/t","1/u","1/v","1/V0","1/Vf","1/w","1/x","1/y","1/z"]
      let keyCount;
      let novaLista = [];
      let novaLista2 = [];

      for(i = 0 ; i < ListaMonomio1.length; i++){
          let _letiavelMonomio = [];
          let _letiavelExpoente = [];

          for(k = 0,  keyCount = Object.keys(ListaMonomio1[i]._incognitas).length;  k < keyCount; k++){
              for(l = 0; l < alfabeto.length ; l++){
                  if(alfabeto[l] == ListaMonomio1[i]._incognitas[k] &&  typeof _dicionario[alfabeto[l]] != 'undefined'){
                      let valor = _dicionario[alfabeto[l]];
                      letra = Math.pow(valor,ListaMonomio1[i]._expoenteIncognitas[k]);
                      res = res*letra;
                  }
                  if(alfabeto[l] == ListaMonomio1[i]._incognitas[k] &&  typeof _dicionario[alfabeto[l]] == "undefined" ){
                      _letiavelMonomio.push(ListaMonomio1[i]._incognitas[k]);
                      _letiavelExpoente.push(ListaMonomio1[i]._expoenteIncognitas[k]);
                      
                  }
              }
              for(l = 0; l < alfabetoInverso.length ; l++){
                  if(alfabetoInverso[l] == ListaMonomio1[i]._incognitas[k] && typeof _dicionario[alfabetoInverso[l]] !== "undefined"){
                      let valor = _dicionario[alfabetoInverso[l]];
                      letra = Math.pow(valor,ListaMonomio1[i]._expoenteIncognitas[k]);
                      res = res*(letra);

                  
                  }
                  if(alfabetoInverso[l] == ListaMonomio1[i]._incognitas[k] &&  typeof _dicionario[alfabetoInverso[l]] == "undefined" ){
                      _letiavelMonomio.push(ListaMonomio1[i]._incognitas[k]);
                      _letiavelExpoente.push(ListaMonomio1[i]._expoenteIncognitas[k]);
                  }
               }
              }
              res = Math.round(res*ListaMonomio1[i]._coeficiente*100)/100;
              if(ListaMonomio1[i]._coeficiente != 0){
                  let Reserva = new Monomio(res,_letiavelMonomio,_letiavelExpoente);
                  novaLista.push(Reserva);
              }
              res = 1;
      }


      for(i = 0 ; i < ListaMonomio2.length; i++){
          let _letiavelMonomio = [];
          let _letiavelExpoente = [];

          for(k = 0,  keyCount = Object.keys(ListaMonomio2[i]._incognitas).length;  k < keyCount; k++){
              for(l = 0; l < alfabeto.length ; l++){
                  if(alfabeto[l] == ListaMonomio2[i]._incognitas[k] &&  typeof _dicionario[alfabeto[l]] !== 'undefined'){
                      let valor = _dicionario[alfabeto[l]];
                      letra = Math.pow(valor,ListaMonomio2[i]._expoenteIncognitas[k]);
                      res = res*letra;
                  }
                  if(alfabeto[l] == ListaMonomio2[i]._incognitas[k] &&  typeof _dicionario[alfabeto[l]] == "undefined" ){
                      _letiavelMonomio.push(ListaMonomio2[i]._incognitas[k]);
                      _letiavelExpoente.push(ListaMonomio2[i]._expoenteIncognitas[k]);
                  }
              }
              for(l = 0; l < alfabetoInverso.length ; l++){
                  if(alfabetoInverso[l] == ListaMonomio2[i]._incognitas[k] &&  typeof _dicionario[alfabeto[l]] !== 'undefined'){
                      let valor = _dicionario[alfabetoInverso[l]];
                      letra = Math.pow(valor,ListaMonomio2[i]._expoenteIncognitas[k]);
                      res = res*(letra);
               }
                  if(alfabetoInverso[l] == ListaMonomio2[i]._incognitas[k] &&  typeof _dicionario[alfabetoInverso[l]] == "undefined" ){
                     _letiavelMonomio.push(ListaMonomio2[i]._incognitas[k]);
                     _letiavelExpoente.push(ListaMonomio2[i]._expoenteIncognitas[k]);
              }
              }
  
      }
               res = Math.round(res*ListaMonomio2[i]._coeficiente*100)/100;
               if(ListaMonomio2[i]._coeficiente != 0){
                  let Reserva = new Monomio(res,_letiavelMonomio,_letiavelExpoente);
                  novaLista2.push(Reserva);
              }
               res = 1
  }
      somarMonomiosParte1(novaLista);
      somarMonomiosParte1(novaLista2);
      somarMonomiosParte2(novaLista,novaLista2);
      organizarPolinomio(novaLista,novaLista2);
      organizarSinais(novaLista,novaLista2);

      return console.log(novaLista,novaLista2);
  }
}
var botaoCalcular = document.getElementById("botaoCalcular");
var inputCalculadora = document.getElementById("inputCalculadora");
var exibidor = document.getElementById("exibidor");
var listaMonomiosEsquerdo = [];
var listaMonomiosDireito = [];
var ladoMonomioEsquerdo = [];
var ladoMonomioDireito = [];
class obterInformaçesMonomio {
  construtor(polinomio) {
    this.polinomio = polinomio;
  }
  ganharInformaçoes(polinomio,tr) {
    var alfabeto = "abcdefghijklmnopqrstuvwxyz~´";
    var index = [];
    var indexx = [];
    var auxi = [];
    var auxo = 0;
    var j = 0;
    var k = 0;
    var aux = 0;
    var _Coeficiente;
    var _incognitas = [];
    var _expoenteIncognitas = [];
    alfabeto.split();
    var i = 0;
    var l;
    var w = 0;
    var z = false;
    while (w < polinomio.length) {
      while (i < 28) {
        index[k] = polinomio[w].indexOf(alfabeto[i]);
        if (index[k] != -1 && i != 27) {
          k += 1;
          index[k + 1] = -1;
        }
        if (index[k] == -1) {
          index.pop();
        }
        i += 1;
      }
      i = 0;
      console.log(index.length);
      if (index.length != 1) {
        while (auxo < k && index.length > 1) {
          while (i < k) {
            if (index[aux] <= index[i + 1]) {
              auxi[auxo] = aux;
            } else if (index[aux] > index[i + 1]) {
              aux = i + 1;
              auxi[auxo] = aux;
            }
            i += 1;
          }
          indexx[auxo] = index[auxi[auxo]];
          index[auxi[auxo]] = 1000;
          auxo += 1;
          aux = 0;
          i = 0;
        }
      }
      i = 0;
      if (index.length == 1) {
        l = polinomio[w].substring(index[0] + 1);
        l = l.split("");
        if (index[0] != 0) {
          console.log(isNaN(polinomio[w].substring(index[0] + 1)));
          console.log(polinomio[w].substring(index[0] + 2));
          _incognitas[0] = polinomio[w].substring(index[0], index[0] + 1);
          _Coeficiente = polinomio[w].substring(0, index[0]);
          if (l.length == 0) {
            _expoenteIncognitas[0] = 1;
          } else {
            _expoenteIncognitas[0] = polinomio[w].substring(index[0] + 2);
          }
        } else {
          _incognitas[0] = polinomio[w].substring(index[0], index[0] + 1);
          _Coeficiente = 1;
          if (l.length == 0) {
            _expoenteIncognitas[0] = 1;
          } else {
            _expoenteIncognitas[0] = polinomio[w].substring(index[0] + 2);
          }
        }
      } else {
        l = [];
        if (indexx[0] != 0) {
          _Coeficiente = polinomio[w].substring(0, indexx[0]);
        } else {
          _Coeficiente = 1;
        }
        while (i < k) {
          _incognitas[i] = polinomio[w].substring(indexx[i], indexx[i] + 1);
          if (i + 1 == k) {
            l = polinomio[w].substring(indexx[i] + 1);
            l = l.split("");
            if (l.length == 0) {
              _expoenteIncognitas[i] = 1;
            } else {
              _expoenteIncognitas[i] = polinomio[w].substring(indexx[i] + 2);
            }
          } else {
            if (isNaN(polinomio[w].substring(indexx[i] + 2, indexx[i + 1]))) {
              _expoenteIncognitas[i] = 1;
            } else {
              _expoenteIncognitas[i] = polinomio[w].substring(indexx[i] + 2, indexx[i + 1]);
            }
          }
          i += 1;
        }
      }
      j = 0;
      console.log("coeficiente:\n" + _Coeficiente)
      console.log(_incognitas);
      console.log(_expoenteIncognitas);
      if(tr){
        var monomio9 = new Monomio(_Coeficiente, _incognitas, _expoenteIncognitas);
        listaMonomiosEsquerdo[w] = monomio9;
        console.log(listaMonomiosEsquerdo[w]);
        monomio9 = {};
      }else{
        var monomio11 = new Monomio(_Coeficiente,_incognitas,_expoenteIncognitas);
        listaMonomiosDireito[w] = monomio11;
        console.log(listaMonomiosDireito[w]);
        monomio11 = {};
      }
      _incognitas = [];
      _Coeficiente = 0;
      _expoenteIncognitas = [];
      aux = 0;
      auxo = 0;
      k = 0;
      j = 0;
      i = 0;
      w += 1;
      l = [];
    }
    if(tr){
    return listaMonomiosEsquerdo;
    }else{
      return listaMonomiosDireito;
    }
  }
}
botaoCalcular.onclick = function printar() {
  var tr = false;
  var n = 0;
  var informacoes = inputCalculadora.value;
  var p = 0;
  var e = 0;
  var repete = false;
  var polinomioEsquerdo;
  var polinomioDireito;
  var iguais;
  var iguais1;
  var iguais2 = [];
  var iguais3 = [];
  n = informacoes.indexOf(",");
  if (n != -1) {
    var alfabetin = "abcdefghijklmnopqrstuvwxyz";
    alfabetin.split();
    iguais = informacoes.substring(0, n);
    iguais1 = informacoes.substring(n);
    n = 0;
    while (n < 26) {
      iguais2[n] = iguais.indexOf(alfabetin[n]);
      iguais3[n] = iguais1.indexOf(alfabetin[n]);
      if (iguais2[n] != -1 && iguais3[n] != -1) {
        repete = true;
      }
      n += 1;
    }
    n = 0;
  }
  if (informacoes.indexOf(",") == -1) {
    p = informacoes.indexOf("=");
    polinomioDireito = informacoes.substring(p + 1);
    if (p != -1) {
      polinomioEsquerdo = informacoes.substring(0, p);
    }
    n = polinomioEsquerdo.indexOf("-");
    while (n != -1) {
      // console.log(n);
      // console.log(polinomioEsquerdo);
      polinomioEsquerdo = polinomioEsquerdo.substring(0, n) + "+" + polinomioEsquerdo.substring(n);
      n = polinomioEsquerdo.indexOf("-", n + 2);
    }
    n = polinomioDireito.indexOf("-");
    while (n != -1) {
      // console.log(m);
      // console.log(polinomioDireito);
      polinomioDireito = polinomioDireito.substring(0, n) + "+" + polinomioDireito.substring(n);
      n = polinomioDireito.indexOf("-", n + 2);
    }
    polinomioEsquerdo = polinomioEsquerdo.replace(/ /g, '').split("+");
    polinomioDireito = polinomioDireito.replace(/ /g, '').split("+");
    console.log(polinomioEsquerdo);
    console.log(polinomioDireito);
    tr = true;
    var polinomioEsquerdo1 = new obterInformaçesMonomio(polinomioEsquerdo);
    ladoMonomioEsquerdo = polinomioEsquerdo1.ganharInformaçoes(polinomioEsquerdo,tr);
    tr = false;
    var polinomioDireito1 = new obterInformaçesMonomio(polinomioDireito);
    ladoMonomioDireito = polinomioDireito1.ganharInformaçoes(polinomioDireito,tr);
  } else if (repete == false) {
    var idi = 0;
    var u2 = 0;
    var u1 = 0;
    var u = 0;
    var q = 0;
    var valores = [];
    var variaveis = [];
    informacoes = informacoes.replace(/ /g, '');
    n = informacoes.indexOf("=");
    e = informacoes.indexOf(",");
    while (n != -1) {
      if (idi == 0) {
        variaveis[q] = informacoes.substring(0, n);
        valores[q] = informacoes.substring(n + 1, e);
        idi += 1;
      } else if (e != -1) {
        variaveis[q] = informacoes.substring(u1 + 1, n);
        valores[q] = informacoes.substring(n + 1, e);
      } else {
        variaveis[q] = informacoes.substring(u1 + 1, n);
        valores[q] = informacoes.substring(n + 1);
      }
      u = n;
      u1 = e;
      n = informacoes.indexOf("=", u + 2);
      e = informacoes.indexOf(",", e + 1);
      q += 1;
    }
    idi = 0;
    console.log(variaveis);
    console.log(valores);
    var dicionario = {};
    var dicionarioInverso = {};
    var v;
    var u3;
    while (u2 < variaveis.length) {
      q = variaveis[u2];
      v = "1/" + variaveis[u2];
      u = parseInt(valores[u2], 10);
      u3 = 1 / +u;
      dicionario[q] = u;
      dicionarioInverso[v] = u3;
      u2 += 1;
    }
    console.log(dicionario);
    console.log(dicionarioInverso);
  } else {
    p = informacoes.indexOf("=");
    polinomDireito = iguais.substring(p + 1);
    if (p != -1) {
      polinomEsquerdo = iguais.substring(0, p);
    }
    n = polinomEsquerdo.indexOf("-");
    while (n != -1) {
      // console.log(n);
      // console.log(polinomioEsquerdo);
      polinomEsquerdo = polinomEsquerdo.substring(0, n) + "+" + polinomEsquerdo.substring(n);
      n = polinomEsquerdo.indexOf("-", n + 2);
    }
    n = polinomDireito.indexOf("-");
    while (n != -1) {
      // console.log(m);
      // console.log(polinomioDireito);
      polinomDireito = polinomDireito.substring(0, n) + "+" + polinomDireito.substring(n);
      n = polinomDireito.indexOf("-", n + 2);
    }
    polinomEsquerdo = polinomEsquerdo.replace(/ /g, '').split("+");
    polinomDireito = polinomDireito.replace(/ /g, '').split("+");
    var listaMonomeo = new obterInformaçesMonomio(polinomEsquerdo);
    var listaMonomeo1 = new obterInformaçesMonomio(polinomDireito);
    tr = true;
    listaVerdadeira = listaMonomeo.ganharInformaçoes(polinomEsquerdo,tr);
    tr = false; 
    listaVerdadeira1 = listaMonomeo1.ganharInformaçoes(polinomDireito,tr);
    console.log(listaVerdadeira);
    console.log(listaVerdadeira1);
    idi = 0;
    u2 = 0;
    u1 = 0;
    u = 0;
    q = 0;
    valores = [];
    variaveis = [];
    iguais1 = iguais1.replace(/ /g, '');
    n = iguais1.indexOf("=");
    e = iguais1.indexOf(",", 2);
    while (n != -1) {
      if (idi == 0 && e != -1) {
        variaveis[q] = iguais1.substring(1, n);
        valores[q] = iguais1.substring(n + 1, e);
        idi += 1;
      } else if (idi == 0 && e == -1) {
        variaveis[q] = iguais1.substring(1, n);
        valores[q] = iguais1.substring(n + 1);
      } else if (e != -1) {
        variaveis[q] = iguais1.substring(u1 + 1, n);
        valores[q] = iguais1.substring(n + 1, e);
      } else {
        variaveis[q] = iguais1.substring(u1 + 1, n);
        valores[q] = iguais1.substring(n + 1);
      }
      u = n;
      u1 = e;
      n = iguais1.indexOf("=", u + 2);
      e = iguais1.indexOf(",", e + 1);
      q += 1;
    }
    idi = 0;
    console.log(variaveis);
    console.log(valores);
    var dicionario = {};
    var dicionarioInverso = {};
    var v;
    var u3;
    while (u2 < variaveis.length) {
      q = variaveis[u2];
      v = "1/" + variaveis[u2];
      u = parseInt(valores[u2], 10);
      u3 = 1 / +u;
      dicionario[q] = u;
      dicionarioInverso[v] = u3;
      u2 += 1;
    }
    console.log(dicionario);
    console.log(dicionarioInverso);
    x = new Cabecalho();
    console.log(x.aplicarValorParcial(listaVerdadeira, listaVerdadeira1, dicionario));
  }
  var monomio10 = new Monomio()


};
