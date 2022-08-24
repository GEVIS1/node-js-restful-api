# Readme for assessment-1-node-js-restful-api

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Quickstart:
1. Copy `example.env` to `.env` and fill out the missing variables
2. `npm start`

This project uses the [Zod](https://zod.dev/) validation library.

## Manipulating Prisma
To create a new migration use: 
> `npm run prisma:migrate -- --name <migration_name>`

To see the current data in the database:
> `npm run prisma:studio`

## Entity Relationship Diagram
![](./prisma/v2/ERD.png)

## Postman documentation:
~~[Here](https://documenter.getpostman.com/view/17480349/UzXKWJp2)~~

## References:
Prisma Data, Inc. (2022, June 21). Best practice for instantiating PrismaClient with Next.js. Prisma. Retrieved August 24, 2022, from https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices