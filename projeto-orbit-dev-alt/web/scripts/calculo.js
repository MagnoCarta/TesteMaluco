//Classe Monomio, base de todo o processo de análise.
class Monomio {
  constructor(_coeficiente = 1, _incognitas = [], _expoenteIncognitas = []) {
    this._coeficiente = _coeficiente; //atributo do tipo float
    this._incognitas = _incognitas; //atributo do tipo lista de strings
    this._expoenteIncognitas = _expoenteIncognitas; //atributo do tipo lista de floats

  }
}
//Classe Polinomio que reune monomios de forma a podê-los escrever de forma mais fácil e organizada.
class Polinomio {
  constructor(_monomio = []) {
    this._monomio = _monomio; //atributo do tipo lista de monomios
  }
}

//Classe Cabeçalho cujos objetos serão responsáveis por povoar a tela "Calculadora" .
class Cabecalho {
  constructor(_assunto, _materia, _formulaEsquerda = [], _formulaDireita = [], _exemplos = [], _nomeParametros = []) {
    this._assunto = _assunto; //atributo do tipo string
    this._materia = _materia; //atributo do tipo string
    this._formulaEsquerda = _formulaEsquerda; //atributo do tipo lista de monomios que está do lado esquerdo da igualdade
    this._formulaDireita = _formulaDireita; //atributo do tipo lista de monomios que está do lado direito da igualdade
    this._exemplos = _exemplos; //atributo do tipo lista de strings
    this._nomeParametros = _nomeParametros; //atributo do tipo lista de strings
  }
  aplicarValorCompleto(_ListaMonomio1, _ListaMonomio2, _dicionario = {}) {
    var i, k, l, letra = 0,
      res = 1,
      res2 = 0;
    var alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    var alfabetoInverso = ["1/a", "1/b", "1/c", "1/d", "1/e", "1/f", "1/g", "1/h", "1/i", "1/j", "1/k", "1/l", "1/m", "1/n",
      "1/o", "1/p", "1/q", "1/r", "1/s", "1/t", "1/u", "1/v", "1/w", "1/x", "1/y", "1/z"
    ]
    var keyCount;

    for (i = 0; i < ListaMonomio1.length; i++) {

      for (k = 0, keyCount = Object.keys(ListaMonomio1[i]._incognitas).length; k < keyCount; k++) {
        for (l = 0; l < alfabeto.length; l++) {
          if (alfabeto[l] == ListaMonomio1[i]._incognitas[k]) {
            var valor = _dicionario[alfabeto[l]];
            letra = Math.pow(valor, ListaMonomio1[i]._expoenteIncognitas[k]);
            res = res * letra;
          }
        }
        for (l = 0; l < alfabetoInverso.length; l++) {
          if (alfabetoInverso[l] == ListaMonomio1[i]._incognitas[k]) {
            var valor = _dicionario[alfabeto[l]];
            letra = Math.pow(valor, ListaMonomio1[i]._expoenteIncognitas[k]);
            res = res * (1 / letra);
          }

        }
      }
      res = res * ListaMonomio1[i]._coeficiente;
      res2 += res;
      res = 1;
    }

    for (i = 0; i < ListaMonomio2.length; i++) {

      for (k = 0, keyCount = Object.keys(ListaMonomio2[i]._incognitas).length; k < keyCount; k++) {
        for (l = 0; l < alfabeto.length; l++) {
          if (alfabeto[l] == ListaMonomio2[i]._incognitas[k]) {
            var valor = _dicionario[alfabeto[l]];
            letra = Math.pow(valor, ListaMonomio2[i]._expoenteIncognitas[k]);
            res = res * letra;
          }
        }
        for (l = 0; l < alfabetoInverso.length; l++) {
          if (alfabetoInverso[l] == ListaMonomio1[i]._incognitas[k]) {
            var valor = _dicionario[alfabetoInverso[l]];
            letra = Math.pow(valor, ListaMonomio1[i]._expoenteIncognitas[k]);
            res = res * (1 / letra);
          }
        }
        res = res * ListaMonomio1[i]._coeficiente;
        res2 -= res;
        res = 1;

      }
    }

    return console.log(Math.round(res2 * 100) / 100);
  }

  aplicarValorParcial(_ListaMonomio1, _ListaMonomio2, _dicionario = {}) {
    var i, k, l, letra = 0,
      res = 1,
      res2 = 0;
    var alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "V0", "Vf", "w", "x", "y", "z"]
    var alfabetoInverso = ["1/a", "1/b", "1/c", "1/d", "1/e", "1/f", "1/g", "1/h", "1/i", "1/j", "1/k", "1/l", "1/m", "1/n", "1/o",
      "1/p", "1/q", "1/r", "1/s", "1/t", "1/u", "1/v", "1/V0", "1/Vf", "1/w", "1/x", "1/y", "1/z"
    ]
    var keyCount;
    var novaLista = [];
    var novaLista2 = [];

    for (i = 0; i < ListaMonomio1.length; i++) {
      var _VariavelMonomio = [];
      var _VariavelExpoente = [];

      for (k = 0, keyCount = Object.keys(ListaMonomio1[i]._incognitas).length; k < keyCount; k++) {
        for (l = 0; l < alfabeto.length; l++) {
          if (alfabeto[l] == ListaMonomio1[i]._incognitas[k] && typeof _dicionario[alfabeto[l]] !== 'undefined') {
            var valor = _dicionario[alfabeto[l]];
            letra = Math.pow(valor, ListaMonomio1[i]._expoenteIncognitas[k]);
            res = res * letra;
            console.log(res);
          }
          if (alfabeto[l] == ListaMonomio1[i]._incognitas[k] && typeof _dicionario[alfabeto[l]] == "undefined") {
            _VariavelMonomio.push(ListaMonomio1[i]._incognitas[k]);
            _VariavelExpoente.push(ListaMonomio1[i]._expoenteIncognitas[k]);

          }
        }
        for (l = 0; l < alfabetoInverso.length; l++) {
          if (alfabetoInverso[l] == ListaMonomio1[i]._incognitas[k] && typeof _dicionario[alfabetoInverso[l]] !== "undefined") {
            var valor = _dicionario[alfabetoInverso[l]];
            letra = Math.pow(valor, ListaMonomio1[i]._expoenteIncognitas[k]);
            res = res * (letra);


          }
          if (alfabetoInverso[l] == ListaMonomio1[i]._incognitas[k] && typeof _dicionario[alfabetoInverso[l]] == "undefined") {
            _VariavelMonomio.push(ListaMonomio1[i]._incognitas[k]);
            _VariavelExpoente.push(ListaMonomio1[i]._expoenteIncognitas[k]);
          }
        }
      }
      res = Math.round(res * ListaMonomio1[i]._coeficiente * 100) / 100;
      res2 += res;
      if (ListaMonomio1[i]._coeficiente != 0) {
        var Reserva = new Monomio(res, _VariavelMonomio, _VariavelExpoente);
        novaLista.push(Reserva);
      }
      res = 1;
    }

    for (i = 0; i < ListaMonomio2.length; i++) {
      var _VariavelMonomio = [];
      var _VariavelExpoente = [];

      for (k = 0, keyCount = Object.keys(ListaMonomio2[i]._incognitas).length; k < keyCount; k++) {
        for (l = 0; l < alfabeto.length; l++) {
          if (alfabeto[l] == ListaMonomio2[i]._incognitas[k] && typeof _dicionario[alfabeto[l]] !== 'undefined') {
            var valor = _dicionario[alfabeto[l]];
            letra = Math.pow(valor, ListaMonomio2[i]._expoenteIncognitas[k]);
            res = res * letra;
          }
          if (alfabeto[l] == ListaMonomio2[i]._incognitas[k] && typeof _dicionario[alfabeto[l]] == "undefined") {
            _VariavelMonomio.push(ListaMonomio2[i]._incognitas[k]);
            _VariavelExpoente.push(ListaMonomio2[i]._expoenteIncognitas[k]);
          }
        }
        for (l = 0; l < alfabetoInverso.length; l++) {
          if (alfabetoInverso[l] == ListaMonomio2[i]._incognitas[k] && typeof _dicionario[alfabeto[l]] !== 'undefined') {
            var valor = _dicionario[alfabetoInverso[l]];
            letra = Math.pow(valor, ListaMonomio2[i]._expoenteIncognitas[k]);
            res = res * (letra);
          }
          if (alfabetoInverso[l] == ListaMonomio2[i]._incognitas[k] && typeof _dicionario[alfabetoInverso[l]] == "undefined") {
            _VariavelMonomio.push(ListaMonomio2[i]._incognitas[k]);
            _VariavelExpoente.push(ListaMonomio2[i]._expoenteIncognitas[k]);
          }
        }

      }
      res = Math.round(res * ListaMonomio2[i]._coeficiente * 100) / 100;
      res2 -= res;
      if (ListaMonomio2[i]._coeficiente != 0) {
        var Reserva = new Monomio(res, _VariavelMonomio, _VariavelExpoente);
        novaLista2.push(Reserva);
      }
      res = 1
    }

    return console.log(novaLista, novaLista2);
  }
}
var lista1 = ["x", "y", "1/z"];
var lista3 = [1, 1 / 2, 3];

var lista4 = ["1/y", "1/x"];
var lista6 = [1, 3];

var lista7 = ["z", "1/z"];
var lista9 = [2, 1];

var lista10 = ["Vf"];
var lista12 = [1];

var lista13 = ["V0"];
var lista14 = [2];

var lista15 = ["a", "s"];
var lista16 = [1, 1];


var dicionario = {
  "m": 3
};
var dicionario2 = {
  "y": 4,
  "1/y": 1 / 4
};
var dicionario3 = {
  "V0": 5,
  "1/V0": 1 / 5,
  "a": 4,
  "1/a": 1 / 4,
  "s": 2,
  "1/s": 1 / 2
};

var Monomio1 = new Monomio(1 / 2, lista1, lista3);
var Monomio2 = new Monomio(-4, lista4, lista6);
var Monomio3 = new Monomio(5, lista7, lista9);
var Monomio4 = new Monomio(Math.round(Math.sqrt(2) * 100) / 100);
var Monomio5 = new Monomio(Math.cos(0), lista10, lista12);
var Monomio6 = new Monomio(1, lista10, lista12);
var Monomio7 = new Monomio(1, lista13, lista14);
var Monomio8 = new Monomio(2, lista15, lista16);


var ListaMonomio1 = [Monomio6];
var ListaMonomio2 = [Monomio7, Monomio8];


var Polinomio3 = new Polinomio(ListaMonomio1);
var Polinomio4 = new Polinomio(ListaMonomio2);

var exemplo1 = ["X^2-X-8=0", "X^2-4=0", "3X^2-4X-7=0", "5^(1\2)X^2-4X+3=0", "1\2X^2+3\4X+3^(3\2)"];

var passos1 = ["1°passo: identificar quem são a , b  e c , observando na fórmula da equação do 2° grau que a é o coeficiente de x^2 , b é o coeficiente de x e c é o coeficiente sem incógnita.", "2° passo: utilizar a fórmula de bhaskara, substituindo a, b, e c em suas devidas posições."];

var Cabecalho1 = new Cabecalho("Equações do 2º Grau", "Matemática", "x = (-b±sqrt(b^2-4ac)/2a ", exemplo1, passos1, "f(x) = a*x**2 + b*x + c");

var Cabecalho2 = new Cabecalho(" Equação de Torricelli", "Física", ListaMonomio1, ListaMonomio2, "", "");

//Cabecalho2.aplicarValorParcial(ListaMonomio1,ListaMonomio2,dicionario3);

//Cabecalho1.aplicarValorCompleto(ListaMonomio1,ListaMonomio2,dicionario3);

//Cabecalho1.aplicarValorParcial(ListaMonomio1,ListaMonomio2,dicionario3);
var botaoCalcular = document.getElementById("botaoCalcular");
var inputCalculadora = document.getElementById("inputCalculadora");
var exibidor = document.getElementById("exibidor");
var listaMonomios = [];
class obterInformaçesMonomio {
  construtor(polinomio) {
    this.polinomio = polinomio;
  }
  ganharInformaçoes(polinomio) {
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
      var monomio9 = new Monomio(_Coeficiente, _incognitas, _expoenteIncognitas);
      listaMonomios[w] = monomio9;
      monomio9 = {};
      console.log(listaMonomios[w]);
      _Coeficiente = 0;
      _expoenteIncognitas = [];
      _incognitas = [];
      aux = 0;
      auxo = 0;
      k = 0;
      j = 0;
      i = 0;
      w += 1;
      l = [];
    }
    return listaMonomios;
  }
}
botaoCalcular.onclick = function printar() {
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
    var polinomioEsquerdo1 = new obterInformaçesMonomio(polinomioEsquerdo);
    polinomioEsquerdo1.ganharInformaçoes(polinomioEsquerdo);
    var polinomioDireito1 = new obterInformaçesMonomio(polinomioDireito);
    polinomioDireito1.ganharInformaçoes(polinomioDireito);
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
    listaVerdadeira = listaMonomeo.ganharInformaçoes(polinomEsquerdo);
    listaVerdadeira1 = listaMonomeo1.ganharInformaçoes(polinomDireito);
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
    console.log(Cabecalho1.aplicarValorParcial(listaVerdadeira, listaVerdadeira1, dicionario));
  }
  var monomio10 = new Monomio()

};
