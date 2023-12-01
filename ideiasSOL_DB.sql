/*drop database ideiassol;*/

create database ideiassol2;

use ideiassol2;

create table department (
	departmentId integer primary key auto_increment not null,
    name varchar (50) not null,
    manager_id integer not null,
    executioner tinyint not null,
    active tinyint not null
);


create table groupSol (
	groupId integer primary key auto_increment not null,
    name varchar (30),
    departmentId integer not null,
    email varchar(50) not null,
    avatar blob,
    active tinyint not null,
    
    foreign key (departmentId) references department (departmentId)
);



create table employee(
	employeeId integer primary key auto_increment not null,
    name varchar (100) not null,
    document varchar(11) not null,
    departmentId integer not null,
    groupId integer not null,
    active tinyint not null,
    type enum("GESTOR", "COLABORADOR") not null,
    
    foreign key (departmentId) references department (departmentId)
);

create table groupMembers (
	memberId integer primary key not null,
    groupId integer not null,
    leader tinyint,
    reporter tinyint,
    
    foreign key (groupId) references groupSol(groupId),
    foreign key (memberId) references employee(employeeId)    
);

create table users (
	userId integer primary key auto_increment not null,
    user varchar (20) not null,
    password varchar (200) not null,
    active tinyint not null,
    type enum ('GESTOR', 'ADMIN', 'GRUPO', "LÍDER", "RELATOR") not null,
    bond integer not null    
);


create table approvers (
	approverId integer primary key not null,
    initialValidity date not null,
    finalValidity date not null,
    
    foreign key (approverId) references employee(employeeId)    
);

create table employeeFrequency (
	employeeId integer not null,
    meetingDate date not null,
    attendance tinyint not null,
    groupId int not null,
    
    primary key (employeeId, meetingDate),     
    foreign key (employeeId) references employee (employeeId),
    foreign key (groupId) references groupSol (groupId)
);

create table ideias (
	ideiaId integer primary key auto_increment not null,
    campaign enum('Melhoria Simples', 'Melhor Ideia') not null,
    title varchar (250) not null,
    group_id int not null,
    status enum('EM ELABORAÇÃO', 'EM APROVAÇÃO', 'APROVADA', 'REPROVADA', 'EM IMPLANTAÇÃO', 'IMPLANTADA') not null,
    description text (4000) not null,
    benefits text (4000) not null, 
    whereToDo text (1000) not null, 
    performer_id int not null,
    investment text (1000) not null, 
    attachments blob,
    problem text (4000),
    howWas text (2000),
    calculationBefore text (1000),
    suggestion text (2000),
    howWasAfter text (2000),
    calculationAfter text (1000),
    gains text (2000),
    hasEnvironmentalGains tinyint default false,
    environmentalGains text (2000),
    hasSecurityGains tinyint default false,
    securityGains text (2000),
    groupInvolvement text (1000),
    glossary text (1000)
);

create table approvalRequests (
	ideiaID integer not null,
    approverId integer not null,
    date date not null,
    deadline date not null
    
    /*foreign key (ideiaID) references ideias (ideiaID),
    foreign key (approverId) references approvers(approverId)*/
);

/*
create table campain (

);

create table betterMonthIdeia (

);

create table betterYearIdeia (

); */

