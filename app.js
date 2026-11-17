const formulario = document.getElementById("form-candidatura");
const lista = document.getElementById("lista-candidaturas");

const CHAVE = "candidaturas";
let candidaturas = JSON.parse(localStorage.getItem(CHAVE)) || [];

function salvarCandidaturas() {
  localStorage.setItem(CHAVE, JSON.stringify(candidaturas));
}

function mostrarCandidaturas() {
  lista.innerHTML = "";

  if (candidaturas.length === 0) {
    const mensagem = document.createElement("p");
    mensagem.textContent = "Suas candidaturas aparecerão aqui.";
    lista.appendChild(mensagem);
    return;
  }

  candidaturas.forEach(function (candidatura) {
    const cartao = document.createElement("article");
    cartao.classList.add("candidatura");

    const titulo = document.createElement("h3");
    titulo.textContent = `${candidatura.cargo} — ${candidatura.empresa}`;
    cartao.appendChild(titulo);

    const paragrafoStatus = document.createElement("p");
    paragrafoStatus.textContent = `Status: ${candidatura.status}`;
    cartao.appendChild(paragrafoStatus);

    const dataFormatada = candidatura.data
      .split("-")
      .reverse()
      .join("/");

    const paragrafoData = document.createElement("p");
    paragrafoData.textContent = `Data: ${dataFormatada}`;
    cartao.appendChild(paragrafoData);

    if (candidatura.link) {
      const endereco = document.createElement("a");
      endereco.href = candidatura.link;
      endereco.textContent = "Ver vaga";
      endereco.target = "_blank";
      endereco.rel = "noopener noreferrer";
      cartao.appendChild(endereco);
    }

    if (candidatura.observacoes) {
      const observacoes = document.createElement("p");
      observacoes.textContent = `Observações: ${candidatura.observacoes}`;
      cartao.appendChild(observacoes);
    }

    lista.appendChild(cartao);
  });
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const dados = new FormData(formulario);

  const novaCandidatura = {
    empresa: dados.get("empresa"),
    cargo: dados.get("cargo"),
    link: dados.get("link"),
    data: dados.get("data"),
    status: formulario.elements["status"].selectedOptions[0].textContent,
    observacoes: dados.get("observacoes").trim()
  };

  candidaturas.push(novaCandidatura);
  salvarCandidaturas();
  mostrarCandidaturas();
  formulario.reset();
});

mostrarCandidaturas();