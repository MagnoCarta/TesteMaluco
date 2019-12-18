var botoesAuxiliares = document.getElementById("botoesAuxiliares").children;
var inputsCalculadora = document.getElementsByClassName("inputCalculadora");
var ultimoInput = inputsCalculadora[0];
for(i = 0; i < inputsCalculadora.length; i++)
{
  let inputAtual = inputsCalculadora[i];
  inputAtual.addEventListener("blur", function(){
    ultimoInput = event.target;
  })
}
for(i = 0; i < botoesAuxiliares.length; i++)
{
  let botaoAtual = botoesAuxiliares[i];
  botaoAtual.addEventListener("click", function(){
    if(ultimoInput === inputsCalculadora[0])
    {
      inputsCalculadora[0].value += botaoAtual.children[0].alt;
    }
    else
    {
      inputsCalculadora[1].value += botaoAtual.children[0].alt;
    }
  })
}

