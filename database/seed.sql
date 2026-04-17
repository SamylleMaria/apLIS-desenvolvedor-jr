USE aplis_db;

DELETE FROM medicos;
DELETE FROM pacientes;

INSERT INTO medicos (id, nome, crm, uf_crm) VALUES
(1, 'João da Silva', '123456', 'CE'),
(2, 'Francisco Pereira', '876543', 'CE');


INSERT INTO pacientes (id, nome, dataNascimento, carteirinha, cpf) VALUES
(1,'Samylle Maria Souza', '1993-04-15', '888888', '04388899922'),
(2, 'Rosana dos Santos', '1975-02-22', '656565', '99988877766' );