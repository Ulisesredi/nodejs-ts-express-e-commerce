# nodejs-ts-express-e-commerce

This is stock and client management application for an e-commerce, based on a pretty basic data model.

## Objective

The goal of this project was to get back on track with backend development. For this project, the focus wasn't on the data model and its complexity, but rather on its technologies and functionalities. The idea for this project is to maintain the data model and its functionalities as a sort of "application template" and iterate on them as I add new technologies to my stack.

## Main Technologies and Libraries Involved

- Node
- Typescript
- Express
- TypeORM
- JSONWebToken
- MySQL
- Docker
- Passport

## Setup

1. Install dependencies
   ```
   yarn install
   ```
2. Setup env variables
   ```
   PORT= change_me
   DB_PORT= change_me
   DB_DATABASE= change_me
   DB_USER= change_me
   DB_PASSWORD= change_me
   DB_HOST= change_me
   JWT_SECRET= change_me
   ```

- The DB name can be modified at `mysql/init.sql`

3. Run docker compose:

   ```
   docker compose up
   ```

4. Populate DB:
   ```
   yarn migrations:gen src/migrations/initDB
   yarn migrations:run
   ```

## Start using the API:

1. Create a user:
   ```
   POST /api/createUser
   {
   "username": "USERNAME",
   "password": "PASSWORD",
   "firstName": "FIRST_NAME",
   "lastName": "LAST_NAME",
   "mobile":"MOBILE",
   "email": "EMAIL@DOMAIN.COM",
   "city": "CITY",
   "province": "PROVINCE",
   "role": "ADMIN" | "USER" | "CUSTOMER"
   }
   ```
2. Authenticate
   ```
   POST /api/login
   {
   "username": "USERNAME",
   "password" : "PASSWORD"
   }
   ```
   - copy `accessToken` from response
   - set `Authorization: Bearer ${accessToken}` header
   - Good to go ✅
