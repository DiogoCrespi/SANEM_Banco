# SANEN - Ambiente PostgreSQL com Docker

Repositório do SANEN: ambiente Docker para PostgreSQL com schema, dados de exemplo e instruções de uso.

## Pré-requisitos
- Docker Desktop (Windows/macOS/Linux)
- PowerShell (Windows) ou terminal compatível

## Estrutura do projeto
- `docker-compose.yml`: sobe o PostgreSQL e aplica o script de inicialização
- `docker/init.sql`: cria o schema (tabelas) no banco `sanem`

## Equipe
- Rebeca Garcia — Scrum Master
- Matheus Castilho — Dev Team (Backend)
- Diogo Crespi — Dev Team (Frontend)
- João Victor — Dev Team (Full Stack)

## Subir o banco
No diretório do projeto (`.\SANEN` no Windows):

```powershell
# Subir containers
docker compose up -d

```

## Integrantes e Papéis no Scrum

| Nome             | Papel Scrum           | Especialidade no Time de Desenvolvimento         |
|------------------|-----------------------|--------------------------------------------------|
| Rebeca Garcia    | Scrum Master          | Coordenação de equipe e facilitadora do Scrum    |
| Matheus Castilho | Dev Team – Backend    | Banco de dados e API REST                        |
| Diogo Crespi     | Dev Team – Frontend   | Interface web responsiva                         |
| João Victor      | Dev Team – Full Stack | Integração de módulos e testes                   |

Isso criará o container `sanem-postgres` com:
- Usuário: `postgres`
- Senha: `postgres`
- Banco: `sanem`
- Porta local: `5432` (pode alterar no compose)

## Verificar/Conectar
- Listar tabelas do schema `public`:
```powershell
docker exec -it sanem-postgres psql -U postgres -d sanem -c "SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY 1;"
```

- Ver colunas de uma tabela (ex.: `usuario`):
```powershell
docker exec -it sanem-postgres psql -U postgres -d sanem -c "SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_schema='public' AND table_name='usuario' ORDER BY ordinal_position;"
```

- Ver conteúdo (até 50 linhas):
```powershell
docker exec -it sanem-postgres psql -U postgres -d sanem -c "SELECT * FROM usuario LIMIT 50;"
```

## Resetar ambiente (recriar do zero)
```powershell
docker compose down -v
docker compose up -d
```

## Alterar porta
Edite `docker-compose.yml` e troque `5432:5432` por outra, ex.: `5433:5432`. Depois reinicie:
```powershell
docker compose down
docker compose up -d
```

## Persistência de dados
Os dados ficam no volume Docker `sanen_db_data`. O comando `down -v` apaga esse volume.

## Solução de problemas
- Docker não inicia / erro de compose: abra o Docker Desktop e tente novamente.
- Porta 5432 ocupada: altere a porta no `docker-compose.yml`.
- Script não rodou: rode um reset (down -v; up -d). O `init.sql` roda somente na primeira inicialização do volume de dados.

## Segurança (dev)
Credenciais padrão são apenas para desenvolvimento. Em produção, use variáveis seguras e políticas de acesso.

## Como executar com Docker
1. Instale o Docker e o Docker Compose
2. Rode: `docker-compose up -d`
3. O banco será inicializado automaticamente com os dados do arquivo `init.sql`

