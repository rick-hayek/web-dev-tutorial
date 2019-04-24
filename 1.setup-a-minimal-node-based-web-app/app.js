const express = require("express");

// body-parser for reading request.body
const bodyParser = require("body-parser");

const app = express();

// ****start**** Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// ****end**** Middleware

class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

const anonymous = "Anonymous";
var user = new User(0, "Anonymous");

const userApi = "/api/user";

// ****start**** Routes
app.get("/", (request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end(`<h1>Hello ${user.name || anonymous}</h>`);
});

app.get(userApi, (request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(
    `{ "url": "${request.url}", "method": "${
      request.method
    }", "current-user": ${JSON.stringify(user)} }`
  );
});

app.post(userApi, (request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  try {
    user.id = request.body.id;
    user.name = request.body.name;
  } catch {}

  response.end(
    `{ "url": "${request.url}", "method": "${
      request.method
    }", "body": ${JSON.stringify(
      request.body
    )} , "current-user": ${JSON.stringify(user)} }`
  );
});

app.delete(userApi, (request, response) => {
  user = { id: 0, name: anonymous };
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end();
});
// ****end**** Routes

// setup express server
const port = 3001;
const host = "http://localhost";

app.listen(port, () => {
  console.log(`listening on ${host}:${port}`);
});
