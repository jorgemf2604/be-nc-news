<!-- HEADER -->
<img src="images/waves.png" alt="multicolor waves" width="100%" height="250px">
<h1 style='color:tomato;font-size:40px;'>NC News API</h1>

<!-- TABLE OF CONTENTS -->
<h2 style='background-color:tomato;padding:5px 10px;border-radius:10px;text-shadow: 0 0 5px black;font-family:monospace'>📚 Table of Contents</h2>

<details open="open">
  <summary>Table of Contents</summary>
  <ol style='list-style:none'>
    <li><a href="#about-the-project"> 🚧 About The Project</a></li>
    <li><a href="#testing"> 🕹️ Testing the Api </a></li>
    <li><a href="#folder-structure"> 📁 Folder Structure</a></li>
    <li><a href="#requirements"> 💿 Requirements</a></li>
    <li><a href="#setting-up"> 🛠️ Setting up the project</a></li>
  </ol>
</details>

<img src="images/rainbow.png" alt="rainbow divider line" width="100%" height="10px">

<!-- ABOUT THE PROJECT -->
<h2 id="about-the-project"> 🚧 About The Project</h2>
<p>This is a project created for the Northcoders Bootcamp. The goal of this news API is to access application data programmatically. We are  trying to mimic the building of a real world backend service (such as reddit). This API will be used as the back-end for a future front end architecture.</p>
<p><em>Link to the hosted version: <a href="https://test2-8rsd.onrender.com/api">live API</a></em></p>

<img src="images/rainbow.png" alt="rainbow divider line" width="100%" height="10px">

<!-- Testing the API -->
<h2 id="testing">🕹️ Testing the Api</h2>
<p>You can find information about the endpoints and what they do in the endpoints.json file and the /api endpoint in the live API</p>
<img src="images/rainbow.png" alt="rainbow divider line" width="100%" height="10px">

<!-- FOLDER STRUCTURE -->
<h2 id="folder-structure" style='font-family: monospace'> 📁 Folder Structure</h2>

    . (root)
    │
    ├── db
    │   ├── data
    |   |     ├──development-data
    |   |     |       ├── articles.js
    |   |     |       ├── comments.js
    |   |     |       ├── index.js
    |   |     |       ├── topics.js
    |   |     |       ├── users.js
    |   |     |
    |   |     ├──test-data
    |   |          ├── articles.js
    |   |          ├── comments.js
    |   |          ├── index.js
    |   |          ├── topics.js
    |   |          ├── users.js
    |   |
    |   ├── seeds
    |   |     ├── run-seed.js.js
    |   |     ├── seed.js
    |   |     ├── utils.js
    |   |
    │   ├── connections.js
    |   ├── setup.sql
    |
    |
    ├── __tests__
    |       ├── app.test.js
    |       ├── utils.test.js
    |
    |
    ├── controllers
    |       ├── articles-controller.js
    |       ├── comments-controller.js
    |       ├── endpoints-controller.js
    |       ├── error-handling.js
    |       ├── topics-controller.js
    |       ├── users-controller.js
    |
    ├── images
    |     ├── rainbow.png
    |     ├── waves.png
    |
    ├── models
    |     ├── articles-model.js
    |     ├── comments-model.js
    |     ├── endpoints-model.js
    |     ├── topics-model.js
    |     ├── users-model.js
    |
    ├── .env-example
    ├── .env.test (you will have to create this file)
    ├── .env.develoment (you will have to create this file)
    ├── endpoints.json
    ├── app.js
    ├── listen.js
    ├── README.md
    ├── .gitignore
    ├── error-handling.md
    ├── package-lock.json
    ├── package.json
    ├── node_modules (more files inside)
    ├── .husky (more files inside)

<img src="images/rainbow.png" alt="rainbow divider line" width="100%" height="10px">

<!-- PREREQUISITES -->
<h2 id="requirements"> 💿 Requirements</h2>

![made-with-node](https://img.shields.io/badge/Made%20with-Node-brightgreen?style=for-the-badge) <br>
![build-with-express](https://img.shields.io/badge/Build%20with-Express-yellow?style=for-the-badge&logo=npm) <br>

The following dependencies are used in this project. Yow will need to install them if you want to run and test the API locally:

- devDependencies:
  - husky: ^8.0.2
  - jest: ^27.5.1
  - jest-extended: ^2.0.0
  - jest-sorted: ^1.0.14
  - nodemon: ^2.0.20
  - pg-format: ^1.0.4,
  - supertest": ^6.3.3
- dependencies:
  - dotenv: ^16.0.0
  - express: ^4.18.2
  - pg: ^8.7.3

This is a node application so you will need to install it if it is not already in your computer. Having a look at the package-lock.json most of the of the packages require a node engine >=6.9.0 (although the node version installed in the machine I built this project is 19.3.0).

The main dependencies are express as the main node framework, node-postgress (pg) to interact with the PostgreSQL database and dotenv to load environment variables from a .env file into process.env, you will need to create two .env files if you want to run the project locally (more of this in sections below).

<img src="images/rainbow.png" alt="rainbow divider line" width="100%" height="10px">

<!-- SETTING UP PROJECT -->
<h2 id="setting-up">🛠️ Setting up the project</h2>
In case you want to run the API locally:
<br />

### Clone the repo

```bash
git clone https://github.com/jorgemf2604/be-nc-news.git
```

### Install dependencies

```bash
npm install
```

### Create two new .env files

You will need to create two .env files for your project: <mark>.env.test</mark> and <mark>.env.development</mark>. Into each, add <strong>PGDATABASE=<database_name_here></strong>, with the correct database name for that environment (see /db/setup.sql for the database names).

### Create local database

```bash
npm run setup-dbs
```

### Seed local database

```bash
npm run seed
```

### Start local server

```bash
npm start
```

### How to run tests

```bash
npm test
```

### How to test the local API server

In a browser or using an app like Insomnia o Postman look for:

```
http://localhost:9090/api/articles/1
```

or other endpoints.

<img src="images/rainbow.png" alt="rainbow divider line" width="100%" height="10px">

<!-- FOOTNOTE -->
<br/>
<i> 🎒 This was a project for the <a href="https://northcoders.com/">Northcoders Coding Bootcamp</a> (UK). Thank you to all the tutors for the feedback provided.<i>
