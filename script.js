
const monografias = [
  {titulo: "O Papel das Microfinanças no Empoderamento Económico", autor: "João Silva", curso: "Economia", ano: "2023", link: "https://www.google.com"},
  {titulo: "Gestão de Recursos Humanos e Desenvolvimento Organizacional", autor: "Maria António", curso: "Gestão de Empresas", ano: "2024", link: "https://www.google.com"},
  {titulo: "Impacto da Cultura de Inovação no Crescimento de Empresas Familiares", autor: "Carlos Manuel", curso: "Contabilidade", ano: "2025", link: "https://www.google.com"}
];

function pesquisar() {
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
