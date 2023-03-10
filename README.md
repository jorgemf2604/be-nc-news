<!-- HEADER -->

![multicolor-waves](./images/waves.png)

# NC News API

<!-- TABLE OF CONTENTS -->

## π Table of Contents

- π§ About The Project
- πΉοΈ Testing the Api
- π Folder Structure
- πΏ Requirements
- π οΈ Setting up the project

![divider](./images/rainbow.png)

<!-- ABOUT THE PROJECT -->

## π§ About The Project

This is a project created for the Northcoders Bootcamp. The goal of this news API is to access application data programmatically. We are trying to mimic the building of a real world backend service (such as reddit). This API will be used as the back-end for a future front end architecture.

Link to the hosted version: https://be-nc-news-oefr.onrender.com/api

![divider](./images/rainbow.png)

<!-- Testing the API -->

## πΉοΈ Testing the Api

You can find information about the endpoints and what they do in the endpoints.json file and the /api endpoint in the live API

![divider](./images/rainbow.png)

<!-- FOLDER STRUCTURE -->

## π Folder Structure

    . (root)
    β
    βββ db
    β   βββ data
    |   |     βββdevelopment-data
    |   |     |       βββ articles.js
    |   |     |       βββ comments.js
    |   |     |       βββ index.js
    |   |     |       βββ topics.js
    |   |     |       βββ users.js
    |   |     |
    |   |     βββtest-data
    |   |          βββ articles.js
    |   |          βββ comments.js
    |   |          βββ index.js
    |   |          βββ topics.js
    |   |          βββ users.js
    |   |
    |   βββ seeds
    |   |     βββ run-seed.js.js
    |   |     βββ seed.js
    |   |     βββ utils.js
    |   |
    β   βββ connections.js
    |   βββ setup.sql
    |
    |
    βββ __tests__
    |       βββ app.test.js
    |       βββ utils.test.js
    |
    |
    βββ controllers
    |       βββ articles-controller.js
    |       βββ comments-controller.js
    |       βββ endpoints-controller.js
    |       βββ error-handling.js
    |       βββ topics-controller.js
    |       βββ users-controller.js
    |
    βββ images
    |     βββ rainbow.png
    |     βββ waves.png
    |
    βββ models
    |     βββ articles-model.js
    |     βββ comments-model.js
    |     βββ endpoints-model.js
    |     βββ topics-model.js
    |     βββ users-model.js
    |
    βββ routes
    |     βββ api-router.js
    |     βββ articles-router.js
    |     βββ comments-router.js
    |     βββ topics-router.js
    |     βββ users-router.js
    |
    βββ .env-example
    βββ .env.test (you will have to create this file)
    βββ .env.develoment (you will have to create this file)
    βββ endpoints.json
    βββ app.js
    βββ listen.js
    βββ README.md
    βββ .gitignore
    βββ error-handling.md
    βββ package-lock.json
    βββ package.json
    βββ node_modules (more files inside)
    βββ .husky (more files inside)

![divider](./images/rainbow.png)

<!-- PREREQUISITES -->

## πΏ Requirements

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

## π οΈ Setting up the project

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

π This was a project for the [Northcoders Coding Bootcamp](https://northcoders.com/) (UK). Thank you to all the tutors for the feedback provided.
