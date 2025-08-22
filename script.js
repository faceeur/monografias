let monografias = [];

async function carregarMonografias() {
  try {
    const resposta = await fetch("https://script.google.com/macros/s/SEU_ID/exec"); // substitua pelo link da sua Web App
    monografias = await resposta.json();

    preencherAnos(); // <- novo: preenche anos após carregar monografias
  } catch (erro) {
    console.error("Erro ao carregar dados das monografias:", erro);
    document.getElementById("resultados").innerHTML = "<p>Erro ao carregar monografias.</p>";
  }
}

function preencherAnos() {
  const selectAno = document.getElementById("ano");

  // Limpa opções existentes e adiciona a padrão
  selectAno.innerHTML = '<option value="">-- Seleccione o ano --</option>';

  // Extrai anos únicos e ordena
  const anosUnicos = [...new Set(monografias.map(m => m.ano))].sort();

  anosUnicos.forEach(ano => {
    const option = document.createElement("option");
    option.value = ano;
    option.textContent = ano;
    selectAno.appendChild(option);
  });
}

async function pesquisar() {
  if (monografias.length === 0) {
    await carregarMonografias();
  }

  const autor = document.getElementById("autor").value.toLowerCase();
  const curso = document.getElementById("curso").value;
  const ano = document.getElementById("ano").value;
  const resultadosDiv = document.getElementById("resultados");

  resultadosDiv.innerHTML = "";

  const resultados = monografias.filter(m => {
    return (
      (autor === "" || m.autor.toLowerCase().includes(autor)) &&
      (curso === "" || m.curso === curso) &&
      (ano === "" || m.ano === ano)
    );
  });

  if (resultados.length === 0) {
    resultadosDiv.innerHTML = "<p>Nenhuma monografia encontrada.</p>";
    return;
  }

  resultados.forEach(m => {
    const div = document.createElement("div");
    div.classList.add("monografia");
    div.innerHTML = `<a href="${m.link}" target="_blank">${m.titulo}</a><br><small>${m.autor} - ${m.curso} (${m.ano})</small>`;
    resultadosDiv.appendChild(div);
  });
}

// Carrega monografias assim que a página carregar
window.addEventListener("DOMContentLoaded", carregarMonografias);
