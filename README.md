# NYSL Rest API

A Rest API built with Express that returns data about the NYSL games. [Try it live here](https://nysl-rest-api.herokuapp.com/). Used in the NYSL Web App to fetch data.

## Games Data

The data returned is an array of objects. Each entry has the following fields:

| Field | Meaning |
| ----- | ------- |
| _id | Unique ID. |
| date | When the game will ocurr in MM/DD format. |
| teams | An array of fields with the names of the teams that will participate. |
| location | School name where the game will occur. |
| preciseLocation | Exact direction where the game will ocurr. |
| time | Moment when the game will occur. |

## Install

To install it you will need Node and NPM (or yarn) installed locally and run the following comands:

```sh
npm install
npm start
```

Also you'll need to setup the following environment variables:

| Variable | Value |
| -------- | ----- |
| NYSL_DB_USERNAME | User of the database |
| NYSL_DB_PASSWORD | Password of the database |

To change the database name or the collection name it has to be done in the code.
