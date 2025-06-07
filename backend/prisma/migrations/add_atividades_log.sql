-- Tabela para registrar atividades do sistema
CREATE TABLE atividades_log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo ENUM('manutencao', 'equipamento', 'usuario', 'sistema') NOT NULL,
    acao VARCHAR(100) NOT NULL,
    descricao TEXT,
    usuario_id INT,
    referencia_id INT,
    referencia_tipo VARCHAR(50),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_usuario_id (usuario_id),
    INDEX idx_data_criacao (data_criacao),
    INDEX idx_referencia (referencia_id, referencia_tipo)
);

-- Triggers para log automático
DELIMITER //

CREATE TRIGGER log_manutencao_insert 
AFTER INSERT ON Manutencao
FOR EACH ROW
BEGIN
    INSERT INTO atividades_log (tipo, acao, descricao, referencia_id, referencia_tipo, usuario_id)
    VALUES ('manutencao', 'criada', CONCAT('Nova manutenção: ', NEW.titulo), NEW.id, 'manutencao', NEW.userId);
END//

CREATE TRIGGER log_equipamento_insert
AFTER INSERT ON Equipamento  
FOR EACH ROW
BEGIN
    INSERT INTO atividades_log (tipo, acao, descricao, referencia_id, referencia_tipo, usuario_id)
    VALUES ('equipamento', 'cadastrado', CONCAT('Novo equipamento: ', NEW.nome), NEW.id, 'equipamento', NEW.userId);
END//

CREATE TRIGGER log_manutencao_update
AFTER UPDATE ON Manutencao
FOR EACH ROW  
BEGIN
    IF OLD.status != NEW.status THEN
        INSERT INTO atividades_log (tipo, acao, descricao, referencia_id, referencia_tipo, usuario_id)
        VALUES ('manutencao', 'status_alterado', 
               CONCAT('Manutenção ', NEW.titulo, ' mudou de ', OLD.status, ' para ', NEW.status), 
               NEW.id, 'manutencao', NEW.userId);
    END IF;
END//

DELIMITER ;