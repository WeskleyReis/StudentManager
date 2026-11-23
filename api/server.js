const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Aponta para a pasta raiz (atividademanager), onde está o index.html
app.use(express.static(path.join(__dirname, '..')));

// Configuração da conexão com o MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // <-- Coloque a senha do seu MySQL aqui
  database: 'student_manager',
  waitForConnections: true,
  connectionLimit: 10
});

// LISTAR estudantes (com filtro) + resumo dos cards
app.get('/api/estudantes', async (req, res) => {
  try {
    const { busca = '', status = '' } = req.query;

    let query = 'SELECT * FROM estudantes WHERE 1=1';
    const params = [];

    if (busca.trim() !== '') {
      query += ' AND (nome LIKE ? OR matricula LIKE ? OR curso LIKE ? OR email LIKE ?)';
      const termo = `%${busca.trim()}%`;
      params.push(termo, termo, termo, termo);
    }

    if (status && status !== 'Todos') {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY id ASC';

    const [estudantes] = await pool.query(query, params);
    const [todos] = await pool.query('SELECT status FROM estudantes');

    const total = todos.length;
    const ativos = todos.filter(e => e.status === 'Ativo').length;
    const trancadosInativos = todos.filter(e => e.status !== 'Ativo').length;

    res.json({
      estudantes,
      resumo: { total, ativos, trancadosInativos }
    });
  } catch (error) {
    console.error('Erro ao listar estudantes:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar estudantes.' });
  }
});

// CADASTRAR novo estudante
app.post('/api/estudantes', async (req, res) => {
  try {
    const { matricula, nome, email, curso, periodo, status } = req.body;

    if (!nome || !email || !curso || !periodo) {
      return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios.' });
    }

    const matriculaFinal = matricula && matricula.trim() !== ''
      ? matricula.replace('#', '').trim()
      : `${new Date().getFullYear()}${Math.floor(1000 + Math.random() * 9000)}`;

    const [result] = await pool.query(
      'INSERT INTO estudantes (matricula, nome, email, curso, periodo, status) VALUES (?, ?, ?, ?, ?, ?)',
      [matriculaFinal, nome.trim(), email.trim(), curso.trim(), periodo.trim(), status || 'Ativo']
    );

    res.status(201).json({ id: result.insertId, mensagem: 'Estudante cadastrado com sucesso!' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ erro: 'Matrícula ou e-mail já cadastrado.' });
    }
    console.error('Erro ao cadastrar:', error);
    res.status(500).json({ erro: 'Erro ao cadastrar estudante.' });
  }
});

// ATUALIZAR estudante
app.put('/api/estudantes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { matricula, nome, email, curso, periodo, status } = req.body;

    await pool.query(
      'UPDATE estudantes SET matricula = ?, nome = ?, email = ?, curso = ?, periodo = ?, status = ? WHERE id = ?',
      [matricula.replace('#', '').trim(), nome.trim(), email.trim(), curso.trim(), periodo.trim(), status, id]
    );

    res.json({ mensagem: 'Registro atualizado com sucesso!' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ erro: 'Matrícula ou e-mail já pertence a outro aluno.' });
    }
    console.error('Erro ao atualizar:', error);
    res.status(500).json({ erro: 'Erro ao atualizar estudante.' });
  }
});

// EXCLUIR estudante
app.delete('/api/estudantes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM estudantes WHERE id = ?', [id]);
    res.json({ mensagem: 'Estudante removido com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir:', error);
    res.status(500).json({ erro: 'Erro ao excluir estudante.' });
  }
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});