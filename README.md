# Readme for assessment-1-node-js-restful-api

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Requirements:
Node version 17 or greater.

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

## TODO:
### User:
You will have three types of users:
- [x] super admin
- [x] admin
- [x] basic user

- [x] Each user will have the following information: 
  - [x] first name
  - [x] last name
  - [x] username
  - [x] email address
  - [x] profile picture
  - [x] password
  - [x] confirm password
  - [x] role. 

  > The users’ profile picture will be from the following API https://avatars.dicebear.com/docs/http-api. Each profile picture should be, in most cases, different. I suggest using random seed when setting the user’s profile picture.

- [ ] Each user can login, logout, get their information & update their information. A super admin user
can get all users’ information, update all admin & basic users’ information & delete all admin &
basic users. An admin user can get all admin & basic users’ information & update all basic users’
information. A basic user can register.

When performing a POST request for registering a basic user, the following error checking must be implemented:
  - [x] First name has a minimum length of two characters, a maximum length of 50 characters & alpha characters only.
  - [x] Last name has the same error checking as first name above.
  - [x] Username is unique, has a minimum length of five characters, maximum length of ten characters & alphanumeric characters only, i.e., johndoe123.
  - [x] Email address is unique, contains the username above, an @ special character & a second-level domain, i.e., johndoe123@email.com.
  - [x] Password has a minimum length of eight characters, maximum length of 16 characters & contains one numeric character & one special character.
  - [x] Confirm password is the same as the password above.
  > Note: Confirm password will not be a field in the User table. Rather, it will be used to validate the user’s password. 
  > For each error check, a status code & response message is returned, i.e., ”First name must have a minimum length of two characters”.

- [ ] When performing a POST request for logging in a user using either username/password or email
address/password, return a status code, a response message, i.e., ”<User’s username> has successfully
logged in” & the user’s JWT.

- [ ] When performing a GET request for logging out a user, return a status code, a response message,
i.e., ”<User’s username> has successfully logged out” & set the user’s JWT to expired.

- [ ] When performing a PUT & DELETE request, return a status code & a response message, i.e.,
”<User’s username>’s information has successfully updated” or ”<User’s username> has successfully
deleted”.

- [ ] Two super admin users are seeded via you. Only you can seed the two super admin users. The
super admin users’ data will be fetched from a local file & inserted into the User table using
Prisma.

- [ ] Five admin users are seeded via a super admin user. Only a super admin user can seed the five
admin users. The admin users’ data will be fetched from a private GitHub Gist using Axios &
inserted into the User table using Prisma.

- [ ] Five basic users are seeded via a super admin or an admin user. Only a super admin or an
admin user can seed the five basic users. The basic users’ data will be fetched from a private
GitHub Gist using Axios & inserted into the User table using Prisma.

### Quiz:
- [ ] Each quiz will have the following information: name, start date, end date, category, difficulty,
type, number of questions, list of questions, list of correct answers, list of incorrect answers, list
of scores, average score, list of ratings, average rating & overall winner. The category, list of questions, list of correct answers & list of incorrect answers will be fetched from the following API -
https://opentdb.com/api config.php. The difficulties will be easy, medium & hard. The types will be
multiple choice or true/false.
- [ ] Each user can get all quizzes, get all past quizzes, get all present quizzes, get all future quizzes, get a
list of scores & get a list of ratings. A super admin & an admin user can create a quiz. A super
admin user can delete a quiz. A basic user can participate in a quiz & rate a quiz.
- [ ] When performing a POST request for creating a quiz, the following error checking must be implemented:
  - [ ] Name has a minimum length of five characters, a maximum length of 30 characters & alpha
characters only.
  - [ ] Start date has to greater than today’s date.
  - [ ] End date has to greater than the start date & no longer than five days.
  - [ ] Number of questions has to be ten.
For each error check, a status code & response message is returned, i.e., ”Name must have a minimum
length of five characters”.
- [ ] When performing a POST request for a basic user who is participating in a quiz, the following error
checking must be implemented:
  - [ ] Can not participate if today’s date is before the start date & after the end date.
  - [ ] Answered all ten questions.
- [ ] When performing a POST request for a basic user who has participated in a quiz, return a status
code, a response message, i.e., ”<User’s username> has successfully participated in <Quiz’s name>”,
user’s score & quiz’s average score.
### HTTP:
- [ ] When performing a GET request for /api/v2/, return a response containing all available endpoints
in the RESTful API.
- [ ] Headers are secured using Helmet.
- [ ] Implement CORS, compression, caching & rate limiting.
### Testing:
- [x] API tests are written using Mocha & Chai.
- [ ] At least 40 API/integration tests verifying the user & quiz functionality.
- [ ] Code coverage using c8.
### Deployment:
- [ ] RESTful API is deployed to Heroku.
### NPM scripts:
- [ ] Opening Prisma Studio.
- [ ] Creating a migration using Prisma.
- [ ] Linting & fixing your code using ESLint.
- [ ] Formatting your code using Prettier.
- [ ] Running API/integration tests using Mocha.
- [ ] Running code coverage using c8 & Mocha.

