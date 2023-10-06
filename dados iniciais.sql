
INSERT INTO department (name, manager_id, executioner, active)
VALUES
    ('Departamento A', 1, 0, 1),
    ('Departamento B', 2, 0, 1),
    ('Departamento C', 3, 0, 1),
    ('Departamento D', 4, 0, 1),
    ('Departamento E', 5, 0, 1);


INSERT INTO groupSol (name, departmentId, email, avatar, active)
VALUES
    ('Grupo 1', 1, 'grupo1@example.com', NULL, 1),
    ('Grupo 2', 2, 'grupo2@example.com', NULL, 1),
    ('Grupo 3', 3, 'grupo3@example.com', NULL, 1),
    ('Grupo 4', 4, 'grupo4@example.com', NULL, 1),
    ('Grupo 5', 5, 'grupo5@example.com', NULL, 1);

-- Inserir dados na tabela employee
INSERT INTO employee (name, document, departmentId, groupId, active, type)
VALUES
    ('Funcionário 1', 159846549, 1, 1, 1, 'Tipo A'),
    ('Funcionário 2', 651489465, 2, 2, 1, 'Tipo B'),
    ('Funcionário 3', 451869465, 3, 3, 1, 'Tipo C'),
    ('Funcionário 4', 168494565, 4, 4, 1, 'Tipo D'),
    ('Funcionário 5', 165848921, 5, 5, 1, 'Tipo E');

-- Inserir dados na tabela groupsMembers
INSERT INTO groupsMembers (memberId, groupId, type)
VALUES
    (1, 1, 'líder'),
    (2, 2, 'relator'),
    (3, 3, 'normal'),
    (4, 4, 'normal'),
    (5, 5, 'normal');
    
    /*?????????????????????*/

-- Inserir dados na tabela users
INSERT INTO users (user, password, active, type)
VALUES
    ('user1', 'senha1', 1, 'Tipo 1'),
    ('user2', 'senha2', 1, 'Tipo 2'),
    ('user3', 'senha3', 1, 'Tipo 3'),
    ('user4', 'senha4', 1, 'Tipo 4'),
    ('user5', 'senha5', 1, 'Tipo 5'); 

-- Inserir dados na tabela approvers
INSERT INTO approvers (approverId, initialValidity, finalValidity)
VALUES
    (1, '2023-01-01', '2023-12-31'),
    (2, '2023-01-01', '2023-12-31'),
    (3, '2023-01-01', '2023-12-31'),
    (4, '2023-01-01', '2023-12-31'),
    (5, '2023-01-01', '2023-12-31');

-- Inserir dados na tabela employeeFrequency
INSERT INTO employeeFrequency (employeeId, meetingDate, attendance)
VALUES
    (1, '2023-09-01', 1),
    (2, '2023-09-01', 1),
    (3, '2023-09-01', 0),
    (4, '2023-09-01', 1),
    (5, '2023-09-01', 0);

-- Inserir dados na tabela ideias
INSERT INTO ideias (campaign, title, group_id, status, description, benefits, whereToDo, performer_id, investment, attachments, problem, howWas, calculationBefore, suggestion, howWasAfter, calculationAfter, gains, hasEnvironmentalGains, environmentalGains, hasSecurityGains, securityGains, groupInvolvement, glossary)
VALUES
    (1, 'Ideia 1', 1, 'Em andamento', 'Descrição da Ideia 1', 'Benefícios da Ideia 1', 'Local da Implementação 1', 1, 'Investimento 1', NULL, 'Problema 1', 'Como era antes 1', 'Cálculo antes 1', 'Sugestão 1', 'Como ficou depois 1', 'Cálculo depois 1', 'Ganhos 1', 1, 'Ganhos ambientais 1', 1, 'Ganhos de segurança 1', 'Envolvimento do Grupo 1', 'Glossário 1'),
    (2, 'Ideia 2', 2, 'Aprovada', 'Descrição da Ideia 2', 'Benefícios da Ideia 2', 'Local da Implementação 2', 2, 'Investimento 2', NULL, 'Problema 2', 'Como era antes 2', 'Cálculo antes 2', 'Sugestão 2', 'Como ficou depois 2', 'Cálculo depois 2', 'Ganhos 2', 0, NULL, 1, 'Ganhos de segurança 2', 'Envolvimento do Grupo 2', 'Glossário 2'),
    (3, 'Ideia 3', 3, 'Rejeitada', 'Descrição da Ideia 3', 'Benefícios da Ideia 3', 'Local da Implementação 3', 3, 'Investimento 3', NULL, 'Problema 3', 'Como era antes 3', 'Cálculo antes 3', 'Sugestão 3', 'Como ficou depois 3', 'Cálculo depois 3', 'Ganhos 3', 1, 'Ganhos ambientais 3', 0, NULL, 'Envolvimento do Grupo 3', 'Glossário 3'),
    (4, 'Ideia 4', 4, 'Em andamento', 'Descrição da Ideia 4', 'Benefícios da Ideia 4', 'Local da Implementação 4', 4, 'Investimento 4', NULL, 'Problema 4', 'Como era antes 4', 'Cálculo antes 4', 'Sugestão 4', 'Como ficou depois 4', 'Cálculo depois 4', 'Ganhos 4', 0, NULL, 0, NULL, 'Envolvimento do Grupo 4', 'Glossário 4'),
    (5, 'Ideia 5', 5, 'Aprovada', 'Descrição da Ideia 5', 'Benefícios da Ideia 5', 'Local da Implementação 5', 5, 'Investimento 5', NULL, 'Problema 5', 'Como era antes 5', 'Cálculo antes 5', 'Sugestão 5', 'Como ficou depois 5', 'Cálculo depois 5', 'Ganhos 5', 1, 'Ganhos ambientais 5', 1, 'Ganhos de segurança 5', 'Envolvimento do Grupo 5', 'Glossário 5');
    
    
INSERT INTO approvalRequests (ideiaID, approverId, date, deadline)
VALUES
    (1, 5, '2023-09-01', '2023-09-15'),
    (2, 4, '2023-09-02', '2023-09-16'),
    (3, 3, '2023-09-03', '2023-09-17'),
    (4, 2, '2023-09-04', '2023-09-18'),
    (5, 1, '2023-09-05', '2023-09-19');