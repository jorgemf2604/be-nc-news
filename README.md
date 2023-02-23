<!-- HEADER -->

![multicolor-waves](./images/waves.png)

# NC News API

<!-- TABLE OF CONTENTS -->

## 📚 Table of Contents

- 🚧 About The Project
- 🕹️ Testing the Api
- 📁 Folder Structure
- 💿 Requirements
- 🛠️ Setting up the project

![divider](./images/rainbow.png)

<!-- ABOUT THE PROJECT -->

## 🚧 About The Project

This is a project created for the Northcoders Bootcamp. The goal of this news API is to access application data programmatically. We are trying to mimic the building of a real world backend service (such as reddit). This API will be used as the back-end for a future front end architecture.

Link to the hosted version: https://be-nc-news-oefr.onrender.com/api

![divider](./images/rainbow.png)

<!-- Testing the API -->

## 🕹️ Testing the Api

You can find information about the endpoints and what they do in the endpoints.json file and the /api endpoint in the live API

![divider](./images/rainbow.png)

<!-- FOLDER STRUCTURE -->

## 📁 Folder Structure

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
    ├── routes
    |     ├── api-router.js
    |     ├── articles-router.js
    |     ├── comments-router.js
    |     ├── topics-router.js
    |     ├── users-router.js
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

![divider](./images/rainbow.png)

<!-- PREREQUISITES -->

## 💿 Requirements

![made-with-node](https://img.shields.io/badge/Made%20with-Node-brightgreen?style=for-the-badge)\
![build-with-express](https://img.shields.io/badge/Build%20with-Express-yellow?style=for-the-badge&logo=npm)

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

![divider](./images/rainbow.png)

<!-- SETTING UP PROJECT -->

## 🛠️ Setting up the project

In case you want to run the API locally:

### Clone the repo

```bash
git clone https://github.com/jorgemf2604/be-nc-news.git
```

### Install dependencies

```bash
npm install
```

### Create two new .env files

You will need to create two .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=<database_name_here> with the correct database name for that environment (see /db/setup.sql for the database names).

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

![divider](./images/rainbow.png)

<!-- FOOTNOTE -->

🎒 This was a project for the [Northcoders Coding Bootcamp](https://northcoders.com/) (UK). Thank you to all the tutors for the feedback provided.
