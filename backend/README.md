# Portfolio Backend API

Backend FastAPI com SQLite para gerenciamento dinâmico do portfolio.

## Instalação

```bash
# Criar ambiente virtual (opcional)
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

# Instalar dependências
pip install -r requirements.txt
```

## Executar

```bash
# Modo desenvolvimento (com auto-reload)
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Modo produção
uvicorn main:app --host 0.0.0.0 --port 8000
```

## Documentação

Após iniciar o servidor, acesse:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints

### Profile
- `GET /profile` - Obter perfil
- `POST /profile` - Criar perfil (só se não existir)
- `PUT /profile/{id}` - Atualizar perfil

### Categories
- `GET /categories` - Listar categorias ativas
- `GET /categories/{id}` - Obter categoria específica
- `POST /categories` - Criar categoria
- `PUT /categories/{id}` - Atualizar categoria
- `DELETE /categories/{id}` - Desativar categoria (soft delete)

### Projects
- `GET /projects` - Listar todos os projetos ativos
- `GET /projects/by-category/{category_id}` - Listar projetos por categoria
- `GET /projects/{id}` - Obter projeto específico
- `POST /projects` - Criar projeto
- `PUT /projects/{id}` - Atualizar projeto
- `DELETE /projects/{id}` - Desativar projeto (soft delete)

### Contacts
- `GET /contacts` - Listar contatos ativos
- `GET /contacts/{id}` - Obter contato específico
- `POST /contacts` - Criar contato
- `PUT /contacts/{id}` - Atualizar contato
- `DELETE /contacts/{id}` - Desativar contato (soft delete)

## Seed Data

Ao iniciar a aplicação pela primeira vez, os seguintes dados são criados automaticamente:

- **Profile**: Jonathan Venancio (com dados do frontend atual)
- **Categories**: Segurança, Programação, Ciência de Dados
- **Projects**: 11 projetos distribuídos nas 3 categorias
- **Contacts**: Email, LinkedIn, GitHub

## Banco de Dados

O SQLite é usado por padrão e cria o arquivo `portfolio.db` na raiz do projeto.

Para mudar para PostgreSQL, edite `database.py`:

```python
SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/dbname"
```

E instale o driver:
```bash
pip install psycopg2-binary
```

## CORS

O backend está configurado para aceitar requisições de:
- http://localhost:5173 (Vite default)
- http://localhost:3000 (React default)

Para adicionar mais origens, edite `main.py`.

## Estrutura do Projeto

```
backend/
├── main.py              # Aplicação FastAPI principal
├── database.py          # Configuração do banco de dados
├── models.py            # Modelos SQLAlchemy
├── schemas.py           # Schemas Pydantic
├── crud.py              # Operações CRUD
├── routers/             # Rotas da API
│   ├── __init__.py
│   ├── profile.py
│   ├── categories.py
│   ├── projects.py
│   └── contacts.py
├── requirements.txt     # Dependências
└── README.md           # Este arquivo
```
