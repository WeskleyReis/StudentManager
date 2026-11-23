const API_URL = 'http://localhost:3000/api/estudantes';
let listaAtual = [];

async function carregarEstudantes() {
  try {
    const busca = document.getElementById('inputBusca').value;
    const status = document.getElementById('selectStatus').value;

    const params = new URLSearchParams({ busca, status });
    const res = await fetch(`${API_URL}?${params.toString()}`);
    const dados = await res.json();

    listaAtual = dados.estudantes;

    // Atualiza os cards de resumo
    document.getElementById('kpiTotal').textContent = dados.resumo.total;
    document.getElementById('kpiAtivos').textContent = dados.resumo.ativos;
    document.getElementById('kpiInativos').textContent = dados.resumo.trancadosInativos;

    // Renderiza a tabela
    const tbody = document.getElementById('tabelaCorpo');
    tbody.innerHTML = '';

    dados.estudantes.forEach(aluno => {
      const tr = document.createElement('tr');
      tr.onclick = () => editarPorId(aluno.id);

      tr.innerHTML = `
        <td class="matricula">#${aluno.matricula}</td>
        <td>
          <span class="student-name">${aluno.nome}</span>
          <span class="student-email">${aluno.email}</span>
        </td>
        <td>${aluno.curso}</td>
        <td>${aluno.periodo}</td>
        <td><span class="badge badge-${aluno.status}">${aluno.status}</span></td>
        <td>
          <div class="actions" onclick="event.stopPropagation()">
            <button class="icon-btn" title="Editar" onclick="editarPorId(${aluno.id})">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button class="icon-btn delete" title="Excluir" onclick="excluirAluno(${aluno.id})">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    document.getElementById('contadorRodape').textContent =
      `Mostrando ${dados.estudantes.length} de ${dados.resumo.total} estudantes`;
  } catch (error) {
    console.error('Erro ao conectar com a API:', error);
  }
}

function editarPorId(id) {
  const aluno = listaAtual.find(item => item.id === id);
  if (aluno) abrirModal(aluno);
}

function abrirModal(aluno = null) {
  const modal = document.getElementById('modalAluno');
  document.getElementById('modalTitulo').textContent = aluno ? 'Editar Estudante' : 'Novo Aluno';
  document.getElementById('alunoId').value = aluno ? aluno.id : '';
  document.getElementById('campoMatricula').value = aluno ? aluno.matricula : '';
  document.getElementById('campoNome').value = aluno ? aluno.nome : '';
  document.getElementById('campoEmail').value = aluno ? aluno.email : '';
  document.getElementById('campoCurso').value = aluno ? aluno.curso : '';
  document.getElementById('campoPeriodo').value = aluno ? aluno.periodo : '';
  document.getElementById('campoStatus').value = aluno ? aluno.status : 'Ativo';
  modal.classList.add('active');
}

function fecharModal() {
  document.getElementById('modalAluno').classList.remove('active');
}

async function salvarAluno(event) {
  event.preventDefault();
  const id = document.getElementById('alunoId').value;

  const payload = {
    matricula: document.getElementById('campoMatricula').value,
    nome: document.getElementById('campoNome').value,
    email: document.getElementById('campoEmail').value,
    curso: document.getElementById('campoCurso').value,
    periodo: document.getElementById('campoPeriodo').value,
    status: document.getElementById('campoStatus').value
  };

  const url = id ? `${API_URL}/${id}` : API_URL;
  const method = id ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const err = await res.json();
    alert(err.erro || 'Erro ao salvar registro.');
    return;
  }

  fecharModal();
  carregarEstudantes();
}

async function excluirAluno(id) {
  const aluno = listaAtual.find(item => item.id === id);
  const nome = aluno ? aluno.nome : 'este estudante';

  if (!confirm(`Deseja realmente excluir o registro de ${nome}?`)) return;

  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (res.ok) carregarEstudantes();
}

// Carrega os dados ao abrir a página
carregarEstudantes();