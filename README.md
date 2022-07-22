## Coding challenge project

### Task description
[Squirro Frontend Coding Challenge](https://github.com/squirro/frontend-coding-challenge#readme)

### How to run it

Open project folder, install dependencies and run it.
* Start api server (http://localhost:3000)
```shell
    cd book-store-api
    npm install
    npm run start
```
* Start web application in dev mode (http://localhost:3030)
```shell
    cd book-store-web
    npm install
    npm run dev
```

### Run e2e tests
Playwright is used for e2e tests. 

> Web application must be started before we run e2e tests (see previous step).

```shell
    cd book-store-web
    npx playwright install
    npm run test:e2e
```

### Run code check (for development)
It runs all static code analysis with attempt to fix it, also runs unit/e2e tests.
```shell
    cd book-store-web
    npm run code:check
```

### Todos
There are several areas for improvement
* There is no real `JsonApi` service, which should be separated from `/store` endpoint specifics.
* Have universal utility function to build response objects enriched with relational data (fields).
* Current `JsonApi` models is just fist naive approach to define data.

### Notes
* This task was done as part of screening process at [Squirro](https://squirro.com/).
* `book-store-api` folder contains already given server side code, I haven't added a single line there.
* I used Vite as build tool, because I wanted to try something different, something less heavy than CRA (webpack).
* I decided to try out Playwright for e2e tests - a new tool for me (good opportunity to compare it with Cypress).
* I have preference to invest more into e2e tests, rather than write unit tests for React components and services.


