# Readme for assessment-1-node-js-restful-api

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This project uses the [Zod](https://zod.dev/) validation library.

## Requirements:
Node version 17 or greater.

## Quickstart:
1. Copy `example.env` to `.env` and fill out the missing variables
2. `npm start`

## Deployment:
The API is live [here](https://node-js-restful-api-gevis1.herokuapp.com/)

To deploy your own version of the API simply run the following commands:
```shell
heroku apps:create <appname>
heroku git:remote -a <appname>
git push heroku main
```


## Manipulating Prisma
To create a new migration use: 
> `npm run prisma:migrate -- --name <migration_name>`

To see the current data in the database:
> `npm run prisma:studio`

## Linting & Formatting
Linting and formatting is done automatically on commit,
but it can also be done manually with the following commands:
*  npm run prettier:check
*  npm run prettier:fix
*  npm run lint:fix

## Tests
This project uses mocha for tests.
To quickly run all tests and output code coverage as HTML execute:
> `npm test`

Once tests are passed the code coverage HTML file can be found [here](./coverage/index.html)

## Entity Relationship Diagram
![](./prisma/v2/ERD.png)

## References:
Prisma Data, Inc. (2022, June 21). Best practice for instantiating PrismaClient with Next.js. Prisma. Retrieved August 24, 2022, from https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

Is there a RegExp.escape function in JavaScript? (2010, August 24). Stack Overflow. Retrieved September 20, 2022, from https://stackoverflow.com/a/3561711

Typescript Error: Property “user” does not exist on type “Request.” (2017, June 6). Stack Overflow. Retrieved September 20, 2022, from https://stackoverflow.com/questions/44383387/typescript-error-property-user-does-not-exist-on-type-request

Robinson, S. (2021, July 16). Encoding and Decoding Base64 Strings in Node.js. Stack Abuse. Retrieved October 5, 2022, from https://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/

Au-Yeung, J. (2022, September 2). How to extending error class with TypeScript? The Web Dev. Retrieved October 11, 2022, from https://thewebdev.info/2022/05/12/how-to-extending-error-class-with-typescript/
