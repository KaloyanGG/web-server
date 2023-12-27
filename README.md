# "Web Server" API with Bun and Elysia

This is my first API Application using for the new JS runtime Bun and the TypeScript framework Elysia. To start the server, use the following command:

```
npm run dev
```
The server runs on port 8080.

## About Bun and Elysia
Bun is a framework for building web applications. It provides a set of tools and libraries that simplify the process of creating complex web applications.

Elysia is a library for building RESTful APIs. It provides a set of tools and libraries that simplify the process of creating, testing, and documenting APIs.

## Database
The database is a simple JSON file. It is located in the folder `src/database`.

## Known Issues
Please note that the Swagger documentation is currently not working correctly with Elysia. I'm aware of this issue and working on a fix. However, at least you can check it out at http://localhost:8080/docs. Moreover, cascade delete is not implemented since the purpose of this project is to learn Bun and Elysia.