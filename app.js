const formulario = document.getElementById("form-candidatura");
const lista = document.getElementById("lista-candidaturas");
const filtroStatus = document.getElementById("filtro-status");
const CHAVE = "candidaturas";

let candidaturas = [];

try {
  candidaturas = JSON.parse(localStorage.getItem(CHAVE)) || [];
} catch (erro) {
  console.error("Não foi possível carregar as candidaturas:", erro);
}

function salvarCandidaturas() {
  localStorage.setItem(CHAVE, JSON.stringify(candidaturas));
}

function mostrarCandidaturas() {
  lista.innerHTML = "";

  const statusSelecionado = filtroStatus ? filtroStatus.value : "";

  const candidaturasVisiveis = candidaturas.filter(function (candidatura) {
    return (
      statusSelecionado === "" ||
      candidatura.status === statusSelecionado
    );
  });

  if (candidaturasVisiveis.length === 0) {
    const mensagem = document.createElement("p");

    if (candidaturas.length === 0) {
      mensagem.textContent = "Suas candidaturas aparecerão aqui.";
    } else {
      mensagem.textContent = "Não há candidaturas com esse status.";
    }

    lista.appendChild(mensagem);
    return;
  }

  candidaturasVisiveis.forEach(function (candidatura) {
    const cartao = document.createElement("article");
    cartao.classList.add("candidatura");

    const titulo = document.createElement("h3");
    titulo.textContent = `${candidatura.cargo} — ${candidatura.empresa}`;
    cartao.appendChild(titulo);

    const paragrafoStatus = document.createElement("p");
    paragrafoStatus.textContent = `Status: ${candidatura.status}`;
    cartao.appendChild(paragrafoStatus);

    const dataFormatada = candidatura.data
      ? candidatura.data.split("-").reverse().join("/")
      : "Não informada";

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

    const botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.classList.add("botao-excluir");

    botaoExcluir.addEventListener("click", function () {
      candidaturas = candidaturas.filter(function (item) {
        return item !== candidatura;
      });

      salvarCandidaturas();
      mostrarCandidaturas();
    });

    cartao.appendChild(botaoExcluir);
    lista.appendChild(cartao);
  });
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const dados = new FormData(formulario);

  const novaCandidatura = {
    empresa: dados.get("empresa").trim(),
    cargo: dados.get("cargo").trim(),
    link: dados.get("link").trim(),
    data: dados.get("data"),
    status: formulario.elements["status"].selectedOptions[0].textContent,
    observacoes: dados.get("observacoes").trim()
  };

  candidaturas.push(novaCandidatura);
  salvarCandidaturas();
  mostrarCandidaturas();
  formulario.reset();
});

if (filtroStatus) {
  filtroStatus.addEventListener("change", mostrarCandidaturas);
}

mostrarCandidaturas();