# StudentManager

> Site de gestão acadêmica.

## Participantes

**Integrante 1:**

- Weskley Kauã Silva Santos dos Reis
- GitHub: WeskleyReis

**Integrante 2:**

- Davi Calebe Almeida Silva
- GitHub: Davi-Calebe

**Integrante 3:**

- Alex Santos Reis Filho
- GitHub: alexreeiisss

**Integrante 4:**

- Antonio Alexandre de Menezes Neto
- GitHub: AntonioAlexandredeMenezesNeto

**Integrante 5:**

- Layssa Crystyna Souza dos Santos
- GitHub: 

**Integrante 6:**

- Icaro Junior Santos Alves
- GitHub: Ikaroojrr

**Integrante 7:**

- Max Silva
- GitHub: maxsilvaa79

**Integrante 8:**

- Túlio Estevão Cavalcante dos Santos
- GitHub: Tulioecs

---

## 1. Visão Geral

### 1.1 Descrição do Projeto

O StudentManager é uma plataforma web de gestão acadêmica voltada para os setores administrativos da faculdade, tendo como finalidade otimizar o controle e a organização dos processos universitários.

### 1.2 Objetivo

Promover a transformação digital e a centralização dos processos administrativos da instituição de ensino superior, mitigando falhas operacionais, eliminando o retrabalho manual e elevando a eficiência e a confiabilidade na gestão dos dados acadêmicos.

### 1.3 Proposta de Valor

O StudentManager centraliza o gerenciamento de estudantes, facilitando o controle de informações acadêmicas, a atualização de registros e o acompanhamento das matrículas.

---

## 2. Problema

### 2.1 Contexto

Instituições de ensino superior gerenciam diariamente grandes volumes de informações acadêmicas, exigindo organização e atualização constante dos dados dos estudantes.

### 2.2 Problema Identificado

A falta de centralização das informações pode gerar inconsistências nos registros, retrabalho e dificuldades na consulta e atualização dos dados acadêmicos.

### 2.3 Soluções Existentes

Entre as soluções existentes estão planilhas eletrônicas e sistemas de gestão acadêmica. Planilhas podem dificultar o controle e a atualização dos dados, enquanto sistemas tradicionais podem apresentar interfaces complexas.

### 2.4 Hipótese do MVP

A disponibilização de uma plataforma web para cadastro, consulta, edição e exclusão de estudantes poderá melhorar a organização das informações e reduzir tarefas administrativas manuais.

---

## 3. Público-Alvo

### 3.1 Perfil dos Usuários

O sistema é destinado exclusivamente ao corpo administrativo e técnico de instituições de ensino superior (faculdades e universidades).

Os principais perfis são:

**Secretaria Acadêmica:**
Responsáveis por matrículas, emissão de documentos, históricos e registros de alunos.

**Coordenação de Curso:**
Gestores que acompanham grades curriculares, turmas, horários e alocação de professores.

**Gestores e Diretoria Administrativa:**
Profissionais que necessitam de uma visão geral e relatórios para a tomada de decisões institucionais.

### 3.2 Necessidades

Os usuários necessitam de ferramentas que permitam:

- Cadastrar e atualizar informações dos estudantes.

- Consultar registros de forma rápida.

- Pesquisar e filtrar estudantes.

- Acompanhar situações de matrícula.

- Visualizar indicadores acadêmicos gerais.
  
### 3.3 Cenário de Utilização

O sistema será utilizado por profissionais administrativos e técnicos de instituições de ensino superior, por meio de uma interface web, para gerenciar registros e consultar informações acadêmicas.

---

## 4. Escopo do MVP

### 4.1 Funcionalidades Principais

**Cadastro de novos estudantes:** Registrar novos estudantes com informações pessoais e acadêmicas.

**Gerenciamento de estudantes:** Consultar, editar e excluir registros cadastrados.

**Pesquisa e filtragem:** Localizar estudantes por nome, matrícula, curso ou situação acadêmica.

**Dashboard:** Apresentar indicadores de estudantes cadastrados, matrículas ativas e registros trancados ou inativos.

---

## 5. Arquitetura da Solução

### 5.1 Visão Arquitetural

O StudentManager será uma aplicação web composta por uma interface de usuário, uma camada de processamento das operações e um banco de dados para armazenamento das informações acadêmicas.

### 5.2 Fluxo Principal

1. O usuário acessa o sistema e visualiza o Dashboard.
2. Seleciona a operação desejada.
3. O sistema processa a solicitação e consulta ou atualiza os registros.
4. As informações são apresentadas na interface.

---

## 6. Tecnologias Utilizadas

| Categoria | Tecnologia | Finalidade |
|-----------|------------|------------|
| Linguagem de Programação | JavaScript | Lógica do sistema |
| Front-end | HTML e CSS | Estrutura e estilo da interface |
| Back-end | Express | Gerenciamento do servidor |
| Banco de Dados | SQLite | Armazenamento de dados |
| Ferramentas | Figma | Prototipação da interface |

---

## 7. Requisitos

### 7.1 Requisitos Funcionais

- **RF01:** O sistema deve permitir o cadastro de estudantes com informações pessoais e acadêmicas.
- **RF02:** O sistema deve permitir consultar, editar e excluir registros de estudantes.
- **RF03:** O sistema deve permitir pesquisar e filtrar estudantes por nome, matrícula, curso e situação acadêmica.

### 7.2 Requisitos Não Funcionais

- **RNF01:** Desempenho — O sistema deve processar solicitações e apresentar informações em tempo adequado.
- **RNF02:** Segurança — O sistema deve proteger os dados acadêmicos contra acessos e alterações não autorizados.
- **RNF03:** Usabilidade — O sistema deve possuir uma interface intuitiva, organizada e de fácil utilização.
