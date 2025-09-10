-- =========================
-- TABELA USUÁRIO
-- =========================
CREATE TABLE IF NOT EXISTS usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf CHAR(11) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) CHECK (tipo IN ('Administrador','Voluntario')) NOT NULL
);

-- =========================
-- TABELA BENEFICIÁRIO
-- =========================
CREATE TABLE IF NOT EXISTS beneficiario (
    id_beneficiario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf CHAR(11) UNIQUE NOT NULL,
    endereco VARCHAR(150),
    telefone VARCHAR(15),
    dt_nascimento DATE,
    cartao_virtual VARCHAR(50) UNIQUE,
    status VARCHAR(20) CHECK (status IN ('Pendente','Aprovado','Reprovado')) DEFAULT 'Pendente',
    id_usuario INT REFERENCES usuario(id_usuario) ON DELETE SET NULL
);

-- =========================
-- TABELA ITEM (TIPO DE DOAÇÃO)
-- =========================
CREATE TABLE IF NOT EXISTS item (
    id_item SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    estado_conservacao VARCHAR(30) CHECK (estado_conservacao IN ('Novo','Usado - Bom','Usado - Regular')) NOT NULL
);

-- =========================
-- TABELA ESTOQUE
-- =========================
CREATE TABLE IF NOT EXISTS estoque (
    id_estoque SERIAL PRIMARY KEY,
    id_item INT NOT NULL REFERENCES item(id_item) ON DELETE CASCADE,
    quantidade_disponivel INT NOT NULL CHECK (quantidade_disponivel >= 0),
    dt_entrada DATE NOT NULL DEFAULT CURRENT_DATE
);

-- =========================
-- TABELA RETIRADA
-- =========================
CREATE TABLE IF NOT EXISTS retirada (
    id_retirada SERIAL PRIMARY KEY,
    dt_retirada TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_beneficiario INT NOT NULL REFERENCES beneficiario(id_beneficiario) ON DELETE CASCADE,
    id_usuario INT REFERENCES usuario(id_usuario) ON DELETE SET NULL
);

-- =========================
-- TABELA ASSOCIATIVA RETIRADA_ITEM
-- =========================
CREATE TABLE IF NOT EXISTS retirada_item (
    id_retirada INT NOT NULL REFERENCES retirada(id_retirada) ON DELETE CASCADE,
    id_item INT NOT NULL REFERENCES item(id_item) ON DELETE CASCADE,
    quantidade INT NOT NULL CHECK (quantidade > 0),
    PRIMARY KEY (id_retirada, id_item)
);

-- =========================
-- TABELA HISTÓRICO DE OPERAÇÕES
-- =========================
CREATE TABLE IF NOT EXISTS historico_operacao (
    id_operacao SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuario(id_usuario) ON DELETE SET NULL,
    acao VARCHAR(100) NOT NULL,
    dt_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TABELA NOTIFICAÇÃO
-- =========================
CREATE TABLE IF NOT EXISTS notificacao (
    id_notificacao SERIAL PRIMARY KEY,
    id_beneficiario INT NOT NULL REFERENCES beneficiario(id_beneficiario) ON DELETE CASCADE,
    mensagem TEXT NOT NULL,
    dt_envio TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    canal VARCHAR(20) CHECK (canal IN ('Email','WhatsApp')) NOT NULL
);

-- =========================
-- TABELA DESCARTE
-- =========================
CREATE TABLE IF NOT EXISTS descarte (
    id_descarte SERIAL PRIMARY KEY,
    id_item INT NOT NULL REFERENCES item(id_item) ON DELETE CASCADE,
    dt_descarte TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    motivo VARCHAR(150)
);
