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
    npm run test:e2e
```



