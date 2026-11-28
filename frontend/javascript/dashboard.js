
// ---------- Dados ----------
const CHAVE = "studentmanager.alunos";
const POR_PAGINA = 6;

const alunosIniciais = [
  { matricula: "#20231042", nome: "Lucas Gabriel Almeida", email: "lucas.almeida@academico.edu.br", curso: "Engenharia de Software", periodo: "5º Semestre", status: "Ativo" },
  { matricula: "#20231088", nome: "Beatriz Souza Nogueira", email: "beatriz.nogueira@academico.edu.br", curso: "Ciência da Computação", periodo: "3º Semestre", status: "Ativo" },
  { matricula: "#20232019", nome: "Pedro Henrique Costa", email: "pedro.costa@academico.edu.br", curso: "Sistemas de Informação", periodo: "6º Semestre", status: "Trancado" },
  { matricula: "#20231105", nome: "Camila Ferreira Lima", email: "camila.lima@academico.edu.br", curso: "Análise e Desenvolvimento de Sistemas", periodo: "2º Semestre", status: "Ativo" },
  { matricula: "#20232343", nome: "Rafael Mendes Cardoso", email: "rafael.cardoso@academico.edu.br", curso: "Engenharia de Software", periodo: "7º Semestre", status: "Inativo" },
  { matricula: "#20232964", nome: "Juliana Martins Rocha", email: "juliana.rocha@academico.edu.br", curso: "Design Digital", periodo: "4º Semestre", status: "Ativo" }
];

function carregar() {
  try {
    const salvo = localStorage.getItem(CHAVE);
    return salvo ? JSON.parse(salvo) : structuredClone(alunosIniciais);
  } catch {
    return structuredClone(alunosIniciais);
  }
}

function salvar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(alunos));
  } catch {}
}

let alunos = carregar();
let paginaAtual = 1;
let editando = null;

// ---------- Elementos ----------
const $ = (id) => document.getElementById(id);
const tbody = $("tabelaAlunos");
const campoBusca = $("campoBusca");
const filtroStatus = $("filtroStatus");
const modal = $("modal");
const form = $("formAluno");

// ---------- Utilitários ----------
function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

function semAcento(t) {
  return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const ICONE_EDITAR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>';

const ICONE_EXCLUIR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v5M14 11v5"/></svg>';

// ---------- Lógica ----------
function filtrar() {
  const termo = semAcento(campoBusca.value.trim());
  const status = filtroStatus.value;

  return alunos.filter((a) => {
    const bateBusca = !termo ||
      semAcento(a.nome).includes(termo) ||
      semAcento(a.matricula).includes(termo) ||
      semAcento(a.curso).includes(termo);

    const bateStatus = !status || a.status === status;

    return bateBusca && bateStatus;
  });
}

function atualizarContadores() {
  const ativos = alunos.filter((a) => a.status === "Ativo").length;

  $("total").textContent = alunos.length;
  $("ativas").textContent = ativos;
  $("outros").textContent = alunos.length - ativos;
}

function renderizar() {
  const lista = filtrar();
  const totalPaginas = Math.max(1, Math.ceil(lista.length / POR_PAGINA));

  paginaAtual = Math.min(paginaAtual, totalPaginas);

  const inicio = (paginaAtual - 1) * POR_PAGINA;
  const pagina = lista.slice(inicio, inicio + POR_PAGINA);

  if (pagina.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="vazio">Nenhum estudante encontrado.</td></tr>';
  } else {
    tbody.innerHTML = pagina.map((a) => `
      <tr>
        <td class="matricula esq">${escapar(a.matricula)}</td>
        <td class="aluno">
          <strong>${escapar(a.nome)}</strong>
          <small>${escapar(a.email)}</small>
        </td>
        <td class="curso">${escapar(a.curso)}</td>
        <td>${escapar(a.periodo)}</td>
        <td><span class="badge ${escapar(a.status.toLowerCase())}">${escapar(a.status)}</span></td>
        <td>
          <span class="acoes">
            <button class="btn-icone" data-acao="editar" data-id="${escapar(a.matricula)}">${ICONE_EDITAR}</button>
            <button class="btn-icone excluir" data-acao="excluir" data-id="${escapar(a.matricula)}">${ICONE_EXCLUIR}</button>
          </span>
        </td>
      </tr>`).join("");
  }

  $("infoRodape").textContent = `Mostrando ${pagina.length} de ${lista.length} estudantes`;
  $("paginaAtual").textContent = paginaAtual;
  $("btnAnterior").disabled = paginaAtual <= 1;
  $("btnProximo").disabled = paginaAtual >= totalPaginas;

  atualizarContadores();
}

// ---------- Modal ----------
function abrirModal(aluno) {
  editando = aluno ? aluno.matricula : null;

  $("tituloModal").textContent = aluno ? "Editar Aluno" : "Novo Aluno";
  $("fMatricula").value = aluno ? aluno.matricula : "";
  $("fNome").value = aluno ? aluno.nome : "";
  $("fEmail").value = aluno ? aluno.email : "";
  $("fCurso").value = aluno ? aluno.curso : "";
  $("fPeriodo").value = aluno ? aluno.periodo : "";
  $("fStatus").value = aluno ? aluno.status : "Ativo";

  modal.showModal();
}

form.addEventListener("submit", (e) => {
  const novo = {
    matricula: $("fMatricula").value.trim(),
    nome: $("fNome").value.trim(),
    email: $("fEmail").value.trim(),
    curso: $("fCurso").value.trim(),
    periodo: $("fPeriodo").value.trim(),
    status: $("fStatus").value
  };

  const duplicada = alunos.some(
    (a) => a.matricula === novo.matricula && a.matricula !== editando
  );

  if (duplicada) {
    e.preventDefault();
    alert("Já existe um aluno com essa matrícula.");
    return;
  }

  if (editando) {
    alunos = alunos.map((a) => a.matricula === editando ? novo : a);
  } else {
    alunos.push(novo);
  }

  salvar();
  renderizar();
});

// ---------- Eventos ----------
campoBusca.addEventListener("input", () => {
  paginaAtual = 1;
  renderizar();
});

filtroStatus.addEventListener("change", () => {
  paginaAtual = 1;
  renderizar();
});

$("btnNovo").addEventListener("click", () => abrirModal(null));
$("btnCancelar").addEventListener("click", () => modal.close());

$("btnAnterior").addEventListener("click", () => {
  paginaAtual--;
  renderizar();
});

$("btnProximo").addEventListener("click", () => {
  paginaAtual++;
  renderizar();
});

tbody.addEventListener("click", (e) => {
  const botao = e.target.closest("button[data-acao]");
  if (!botao) return;

  const aluno = alunos.find((a) => a.matricula === botao.dataset.id);
  if (!aluno) return;

  if (botao.dataset.acao === "editar") {
    abrirModal(aluno);
  } else if (confirm(`Excluir o aluno ${aluno.nome}?`)) {
    alunos = alunos.filter((a) => a.matricula !== aluno.matricula);
    salvar();
    renderizar();
  }
});

// ---------- Inicialização ----------
renderizar();