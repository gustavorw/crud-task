# 📋 CRUD Task - API de Gerenciamento de Tarefas

Uma simples API REST para gerenciamento de tarefas desenvolvida em Node.js com armazenamento local em JSON. Perfeita para aprender conceitos de CRUD, rotas HTTP e persistência de dados.

---

## ✨ Funcionalidades

- ✅ **Criar tarefas** - Adicionar novas tarefas com título e descrição
- 📖 **Listar tarefas** - Recuperar todas as tarefas ou buscar por termo específico
- ✏️ **Atualizar tarefas** - Modificar título, descrição ou status de conclusão
- 🗑️ **Deletar tarefas** - Remover tarefas do banco de dados
- ✔️ **Marcar como concluída** - Registrar quando uma tarefa foi completada
- 📤 **Importar via CSV** - Adicionar múltiplas tarefas via arquivo CSV

---

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18+) - [Download aqui](https://nodejs.org/)
- **npm** - Vem junto com o Node.js
- Um editor de código (VS Code recomendado)
- Ferramenta para testar APIs (Insomnia, Postman ou curl)

Para verificar se tem Node.js e npm instalados, abra o terminal e rode:

```bash
node --version
npm --version
```

---

## 🚀 Como Rodar Localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/gustavorw/crud-task.git
cd crud-task
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Iniciar o servidor em modo desenvolvimento

```bash
npm run dev
```

Você verá no terminal:
```
Servidor rodando na porta 3000
```

O servidor está pronto! Agora você pode fazer requisições para `http://localhost:3000`

---

## 📡 Endpoints da API

### 1. **Criar uma tarefa** (POST)

**Requisição:**
```bash
POST http://localhost:3000/tasks
Content-Type: application/json

{
  "title": "Estudar Node.js",
  "description": "Aprender sobre CRUD e REST API"
}
```

**Resposta (201 Created):**
```json
{
  "id": "d4c7a3e2-1b45-4f8e-9c2d-8f1a6e3b5c2a",
  "title": "Estudar Node.js",
  "description": "Aprender sobre CRUD e REST API",
  "created_at": "2025-11-24T20:56:28.099Z",
  "completed_at": null,
  "updated_at": null
}
```

---

### 2. **Listar todas as tarefas** (GET)

**Requisição:**
```bash
GET http://localhost:3000/tasks
```

**Resposta (200 OK):**
```json
[
  {
    "id": "d4c7a3e2-1b45-4f8e-9c2d-8f1a6e3b5c2a",
    "title": "Estudar Node.js",
    "description": "Aprender sobre CRUD e REST API",
    "created_at": "2025-11-24T20:56:28.099Z",
    "completed_at": null,
    "updated_at": null
  },
  {
    "id": "e5d8b4f3-2c56-5g9f-0d3e-9g2b7f4c6d3b",
    "title": "Fazer exercício",
    "description": "30 minutos de corrida",
    "created_at": "2025-11-24T21:00:15.456Z",
    "completed_at": null,
    "updated_at": null
  }
]
```

---

### 3. **Buscar tarefas por termo** (GET com query)

**Requisição:**
```bash
GET http://localhost:3000/tasks?search=Node
```

Retorna apenas tarefas que contenham "Node" no título ou descrição.

---

### 4. **Atualizar uma tarefa** (PUT)

**Requisição:**
```bash
PUT http://localhost:3000/tasks/d4c7a3e2-1b45-4f8e-9c2d-8f1a6e3b5c2a
Content-Type: application/json

{
  "title": "Estudar Node.js e Express",
  "description": "Aprender frameworks com Node"
}
```

**Resposta (200 OK):**
```json
{
  "id": "d4c7a3e2-1b45-4f8e-9c2d-8f1a6e3b5c2a",
  "title": "Estudar Node.js e Express",
  "description": "Aprender frameworks com Node",
  "updated_at": "2025-11-24T21:05:30.789Z"
}
```

---

### 5. **Marcar tarefa como concluída** (PATCH)

**Requisição:**
```bash
PATCH http://localhost:3000/tasks/d4c7a3e2-1b45-4f8e-9c2d-8f1a6e3b5c2a/complete
```

**Resposta (200 OK):**
```json
{
  "id": "d4c7a3e2-1b45-4f8e-9c2d-8f1a6e3b5c2a",
  "title": "Estudar Node.js",
  "description": "Aprender sobre CRUD e REST API",
  "created_at": "2025-11-24T20:56:28.099Z",
  "completed_at": "2025-11-24T21:10:45.123Z",
  "updated_at": "2025-11-24T21:10:45.123Z"
}
```

---

### 6. **Deletar uma tarefa** (DELETE)

**Requisição:**
```bash
DELETE http://localhost:3000/tasks/d4c7a3e2-1b45-4f8e-9c2d-8f1a6e3b5c2a
```

**Resposta (204 No Content):**
Sem corpo de resposta (tarefa removida com sucesso)

---

### 7. **Importar tarefas via CSV** (POST)

**Requisição:**
```bash
POST http://localhost:3000/tasks
Content-Type: text/csv

title,description
Tarefa 1,Descrição da tarefa 1
Tarefa 2,Descrição da tarefa 2
Tarefa 3,Descrição da tarefa 3
```

**Resposta (201 Created):**
```json
{ "message": "upload success" }
```

---

## 📁 Estrutura do Projeto

```
crud-task/
├── src/
│   ├── server.js              # Servidor HTTP principal
│   ├── routes.js              # Definição de rotas e handlers
│   ├── database.js            # Camada de banco de dados (JSON)
│   ├── middlewares/
│   │   └── json.js            # Middleware para parsear JSON
│   └── utils/
│       ├── build-route-path.js      # Builder para rotas dinâmicas
│       ├── extract-query-params.js  # Parser de query strings
│       └── parser-csv-to-taks.js    # Parser de CSV para tarefas
├── db.json                    # Banco de dados local (criado automaticamente)
├── package.json               # Dependências e scripts
└── README.md                  # Este arquivo
```

---

## 💾 Armazenamento de Dados

O projeto usa um banco de dados local em JSON (`db.json`), que é criado automaticamente na primeira execução. Todos os dados das tarefas são salvos neste arquivo:

```json
{
  "tasks": [
    {
      "id": "uuid-aqui",
      "title": "Exemplo",
      "description": "Descrição",
      "created_at": "2025-11-24T20:56:28.099Z",
      "completed_at": null,
      "updated_at": null
    }
  ]
}
```

---

## 🧪 Testando com cURL

Se preferir usar o terminal ao invés de uma ferramenta gráfica:

**Criar uma tarefa:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Minha tarefa","description":"Uma descrição"}'
```

**Listar tarefas:**
```bash
curl http://localhost:3000/tasks
```

**Buscar tarefas:**
```bash
curl "http://localhost:3000/tasks?search=Node"
```

---

## 🔍 Troubleshooting

### ❌ "Porta 3000 já está em uso"

A porta 3000 já está sendo utilizada por outro processo. Você pode:

1. Matar o processo que está usando a porta
2. Ou modificar a porta no arquivo `src/server.js`

**Para macOS/Linux:**
```bash
lsof -i :3000
kill -9 <PID>
```

**Para Windows (PowerShell):**
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

---

### ❌ "Cannot find module"

Se receber erro sobre módulos faltando:

```bash
npm install
```

---

### ❌ "db.json não foi criado"

Certifique-se de que:
- O servidor está rodando com `npm run dev`
- Você fez pelo menos uma requisição POST
- A pasta tem permissão de escrita

---

## 📚 Recursos Adicionais

- [Documentação Node.js HTTP](https://nodejs.org/api/http.html)
- [MDN - REST API](https://developer.mozilla.org/en-US/docs/Glossary/REST)
- [Padrão de Commits Convencional](https://www.conventionalcommits.org/pt-br/)

---

## 📄 Licença

ISC

---

## 👤 Autor

[Gustavo Rodrigues](https://github.com/gustavorw)

---

## 🤝 Contribuindo

Sinta-se à vontade para abrir issues ou fazer pull requests!

---

**Desenvolvido com ❤️ usando Node.js**
