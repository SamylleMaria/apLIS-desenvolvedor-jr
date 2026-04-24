# Aplis — Gerenciamento de Médicos e Pacientes

## Sobre o projeto

Aplicação fullstack para gerenciamento de médicos e pacientes, com duas APIs independentes (Node.js e PHP) consumidas por um frontend em React.

O sistema permite:

* Cadastro de médicos
* Cadastro de pacientes
* Listagem e consulta de registros
* Integração entre diferentes backends

O objetivo do projeto é demonstrar organização de arquitetura, separação de responsabilidades e integração entre tecnologias distintas.

---

## Tecnologias

* **Frontend:** React (Vite)
* **Backend (Pacientes):** Node.js + Express
* **Backend (Médicos):** PHP
* **Banco de dados:** MySQL

---

## Estrutura do projeto

```id="d4y9dp"
app/           → frontend em React
backendjs/     → API Node.js (pacientes)
backendphp/    → API PHP (médicos)
database/      → scripts SQL (setup e seed)
```

---

## Endpoints

### Pacientes (Node.js)

* `GET /api/v1/pacientes`
* `POST /api/v1/pacientes`
* `PUT /api/v1/pacientes/{id}`
* `DELETE /api/v1/pacientes/{id}`

---

### Médicos (PHP)

* `GET /api/v1/medicos`
* `POST /api/v1/medicos`
* `PUT /api/v1/medicos/{id}`
* `DELETE /api/v1/medicos/{id}`

---

## Pré-requisitos

* Node.js (versão 20+ recomendada)
* PHP 8+
* Composer
* MySQL

---

## Como executar o projeto

### 1. Banco de dados

Crie o banco:

```sql id="a2w61t"
CREATE DATABASE aplis_db;
```

Execute os scripts:

```bash id="gqbh1f"
mysql -u root -p aplis_db < database/setup.sql
mysql -u root -p aplis_db < database/seed.sql
```

---

### 2. Backend PHP (médicos)

```bash id="sx1n4q"
cd backendphp
composer install
php -S localhost:8000 -t public
```

---

### 3. Backend Node.js (pacientes)

```bash id="l5zdc8"
cd backendjs
npm install
npm run dev
```

---

### 4. Frontend (React)

```bash id="l5gxxs"
cd app
npm install
npm run dev
```

---

## 🌍 Acessos

* Frontend: http://localhost:5173
* API Node: http://localhost:3000/api/v1/pacientes
* API PHP: http://localhost:8000/api/v1/medicos

---

## ⚠️ Observações

* Certifique-se de que o MySQL está rodando antes de iniciar os backends
* Os dados iniciais são carregados via scripts SQL (`database/`)
* O projeto foi testado em ambientes Windows e Linux


---

# 👩‍💻 Autor

Samylle Maria
[samylle.dev@gmail.com](mailto:samylle.dev@gmail.com)
