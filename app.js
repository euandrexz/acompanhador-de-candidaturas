const formulario = document.getElementById("form-candidatura");
const lista = document.getElementById("lista-candidaturas");
let mensagemVazia = document.getElementById("mensagem-vazia");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const dados = new FormData(formulario);

  const empresa = dados.get("empresa");
  const cargo = dados.get("cargo");
  const link = dados.get("link");
  const data = dados.get("data");
  const status = formulario.elements["status"].selectedOptions[0].textContent;
  const observacoes = dados.get("observacoes");

  if (mensagemVazia) {
    mensagemVazia.remove();
    mensagemVazia = null;
  }

  const cartao = document.createElement("article");
  cartao.classList.add("candidatura");

  const titulo = document.createElement("h3");
  titulo.textContent = `${cargo} — ${empresa}`;
  cartao.appendChild(titulo);

  const paragrafoStatus = document.createElement("p");
  paragrafoStatus.textContent = `Status: ${status}`;
  cartao.appendChild(paragrafoStatus);

  const paragrafoData = document.createElement("p");
  paragrafoData.textContent = `Data: ${data.split("-").reverse().join("/")}`;
  cartao.appendChild(paragrafoData);

  if (link) {
    const endereco = document.createElement("a");
    endereco.href = link;
    endereco.textContent = "Ver vaga";
    endereco.target = "_blank";
    endereco.rel = "noopener noreferrer";
    cartao.appendChild(endereco);
  }

  if (observacoes.trim() !== "") {
    const textoObservacoes = document.createElement("p");
    textoObservacoes.textContent = `Observações: ${observacoes}`;
    cartao.appendChild(textoObservacoes);
  }

  lista.appendChild(cartao);
  formulario.reset();
});