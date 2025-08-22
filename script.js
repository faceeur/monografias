let monografias = [];

async function carregarMonografias() {
  try {
    const resposta = await fetch("https://script.google.com/macros/s/AKfycbyIUdmxfjU6QVbAmgutOjAsLvLHluNEOx5bsvYcB6bO_mxljfgNYmrwr-B-0IEt4-Phew/exec"); // substitua pelo seu link da Web App
    monografias = await resposta.json();
  } catch (erro) {
    console.error("Erro ao carregar dados das monografias:", erro);
    document.getElementById("resultados").innerHTML = "<p>Erro ao carregar monografias.</p>";
  }
}

async function pesquisar() {
  if (monografias.length === 0) {
    await carregarMonografias(); // carrega dados só uma vez
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
