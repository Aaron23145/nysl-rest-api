# NYSL Rest API

A Rest API built with Express that returns data about the NYSL games. Try it live here: [NYSL Rest API on Heroku](https://nysl-rest-api.herokuapp.com/). Used in the [NYSL Web App](https://github.com/Aaron23145/nysl-web-app) to fetch data.

## Endpoints

| Kind | URL | Use | Params | Method |
| ------------- | --- | --- | ------ | ------ |
| Games | [/games](https://nysl-rest-api.herokuapp.com/games/) | Get all games information | None | GET |
| Auth | [/auth/register](https://nysl-rest-api.herokuapp.com/auth/register/) | Register a new user specifying its username and password | name and password through body | POST |
| Auth | [/auth/unregister](https://nysl-rest-api.herokuapp.com/auth/unregister/) | Delete an existing user specifying its username and password | name and password through body | POST |
| Auth | [/auth/login](https://nysl-rest-api.herokuapp.com/auth/login/) | Login as an existing user specifying its username and password | name and password through body | POST |
| Chat | [/chat](https://nysl-rest-api.herokuapp.com/chat/) | Get all messages sent in the chat. Required pass user token. | x-access-token as header | GET |
| Chat | [/chat/send](https://nysl-rest-api.herokuapp.com/chat/send/) | Send a new message to the chat. Required pass user token and message content. | x-access-token as header and content as body | POST |

## Install

To install it you will need Node and NPM (or Yarn) installed locally and run the following comands:

```sh
npm install
npm start
```

or if you're using Yarn:

```sh
yarn
yarn start
```

Also you'll need to setup the following environment variables:

| Variable | Value |
| -------- | ----- |
| NYSL_DB_USERNAME | User of the database |
| NYSL_DB_PASSWORD | Password of the database |

To change the database name or the collection name it has to be done in the code.

## Deployment

Just follow the install instructions. No additional configuration is required.
