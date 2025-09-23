-- Dados de exemplo para popular o banco SANEM

-- =========================
-- USUÁRIOS
-- =========================
INSERT INTO usuario (nome, cpf, email, senha, tipo) VALUES
('João Silva', '12345678901', 'joao@email.com', 'senha123', 'Administrador'),
('Maria Santos', '98765432100', 'maria@email.com', 'senha456', 'Voluntario'),
('Pedro Oliveira', '11122233344', 'pedro@email.com', 'senha789', 'Voluntario'),
('Ana Costa', '55566677788', 'ana@email.com', 'senha101', 'Administrador');

-- =========================
-- BENEFICIÁRIOS
-- =========================
INSERT INTO beneficiario (nome, cpf, endereco, telefone, dt_nascimento, cartao_virtual, status, id_usuario) VALUES
('Carlos Mendes', '99988877766', 'Rua A, 123', '11999999999', '1985-03-15', 'CART001', 'Aprovado', 1),
('Lucia Ferreira', '44433322211', 'Rua B, 456', '11888888888', '1990-07-22', 'CART002', 'Aprovado', 2),
('Roberto Lima', '77766655544', 'Rua C, 789', '11777777777', '1978-11-08', 'CART003', 'Pendente', 1),
('Fernanda Souza', '33322211100', 'Rua D, 321', '11666666666', '1992-05-30', 'CART004', 'Aprovado', 3),
('Marcos Pereira', '66655544433', 'Rua E, 654', '11555555555', '1988-12-12', 'CART005', 'Reprovado', 2);

-- =========================
-- ITENS (TIPOS DE DOAÇÃO)
-- =========================
INSERT INTO item (nome, categoria, estado_conservacao) VALUES
('Camiseta', 'Roupas', 'Novo'),
('Calça Jeans', 'Roupas', 'Usado - Bom'),
('Tênis', 'Calçados', 'Usado - Regular'),
('Livro - Matemática', 'Educação', 'Usado - Bom'),
('Mochila', 'Acessórios', 'Novo'),
('Cobertor', 'Casa', 'Usado - Bom'),
('Sapato Social', 'Calçados', 'Usado - Regular'),
('Caderno', 'Educação', 'Novo'),
('Jaqueta', 'Roupas', 'Usado - Bom'),
('Bola de Futebol', 'Esportes', 'Usado - Regular');

-- =========================
-- ESTOQUE
-- =========================
INSERT INTO estoque (id_item, quantidade_disponivel, dt_entrada) VALUES
(1, 15, '2024-01-15'),
(2, 8, '2024-01-16'),
(3, 12, '2024-01-17'),
(4, 5, '2024-01-18'),
(5, 20, '2024-01-19'),
(6, 10, '2024-01-20'),
(7, 6, '2024-01-21'),
(8, 25, '2024-01-22'),
(9, 7, '2024-01-23'),
(10, 3, '2024-01-24');

-- =========================
-- RETIRADAS
-- =========================
INSERT INTO retirada (dt_retirada, id_beneficiario, id_usuario) VALUES
('2024-02-01 10:30:00', 1, 1),
('2024-02-02 14:15:00', 2, 2),
('2024-02-03 09:45:00', 4, 3),
('2024-02-04 16:20:00', 1, 1),
('2024-02-05 11:10:00', 2, 2);

-- =========================
-- RETIRADA_ITEM (ASSOCIATIVA)
-- =========================
INSERT INTO retirada_item (id_retirada, id_item, quantidade) VALUES
(1, 1, 2),  -- Carlos retirou 2 camisetas
(1, 5, 1),  -- Carlos retirou 1 mochila
(2, 2, 1),  -- Lucia retirou 1 calça
(2, 3, 1),  -- Lucia retirou 1 tênis
(3, 4, 1),  -- Fernanda retirou 1 livro
(3, 8, 2),  -- Fernanda retirou 2 cadernos
(4, 6, 1),  -- Carlos retirou 1 cobertor
(4, 9, 1),  -- Carlos retirou 1 jaqueta
(5, 1, 1),  -- Lucia retirou 1 camiseta
(5, 7, 1);  -- Lucia retirou 1 sapato

-- =========================
-- HISTÓRICO DE OPERAÇÕES
-- =========================
INSERT INTO historico_operacao (id_usuario, acao, dt_hora) VALUES
(1, 'Criou beneficiário Carlos Mendes', '2024-01-15 08:30:00'),
(2, 'Aprovou beneficiário Lucia Ferreira', '2024-01-16 10:15:00'),
(1, 'Adicionou item Camiseta ao estoque', '2024-01-15 14:20:00'),
(3, 'Processou retirada #1', '2024-02-01 10:35:00'),
(2, 'Processou retirada #2', '2024-02-02 14:20:00'),
(1, 'Atualizou estoque após retirada', '2024-02-01 10:40:00'),
(3, 'Criou beneficiário Fernanda Souza', '2024-01-18 16:45:00'),
(2, 'Reprovou beneficiário Marcos Pereira', '2024-01-20 11:30:00');

-- =========================
-- NOTIFICAÇÕES
-- =========================
INSERT INTO notificacao (id_beneficiario, mensagem, dt_envio, canal) VALUES
(1, 'Sua retirada foi processada com sucesso. Itens disponíveis para coleta.', '2024-02-01 10:45:00', 'WhatsApp'),
(2, 'Confirmação de retirada: Calça e Tênis prontos para retirada.', '2024-02-02 14:30:00', 'Email'),
(3, 'Seu cadastro está pendente de aprovação. Aguarde contato.', '2024-01-15 09:00:00', 'WhatsApp'),
(4, 'Retirada aprovada: Livro e Cadernos disponíveis.', '2024-02-03 10:00:00', 'Email'),
(5, 'Seu cadastro foi reprovado. Entre em contato para mais informações.', '2024-01-20 12:00:00', 'WhatsApp');

-- =========================
-- DESCARTES
-- =========================
INSERT INTO descarte (id_item, dt_descarte, motivo) VALUES
(7, '2024-01-25 15:30:00', 'Item danificado - solado solto'),
(10, '2024-01-26 11:15:00', 'Bola furada - não pode ser doada'),
(3, '2024-01-27 09:45:00', 'Tênis muito desgastado - estado inadequado');

