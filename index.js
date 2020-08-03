// ## NOTES

// ## - keep list of dependencies

// - generate a package.json file: `npm init -y

// ## way to ignore node_modules content so it doesnt push to GH

// - generate .gitignore file : npx gitignore node

// ## Install Express

// - npm i express

// ## CREATE SERVER

//     - create an index.js file
//     - const express = require("express"); // CommonJS module
//     - const server = express();
//     - const PORT = 8000; // we visit http://localhost:8000/ to see the api
//     - server.listen(PORT, () => console.log(`server running on port ${PORT}`));
//     - run the server with node index.js in terminal
//     - make a GET request in postman or insomnia to localhost:

// ## Run npm i -D nodemon

// - \*\* dev dependency that restarts server on changes

// ## Edit "script" in package.json

//     - "server": "nodemon index.js"
//     - in terminal: run npm server

// ## if using short id or UUID then install it

// ## teach express how to read JSON form req.body

// \*\* server.use(express.json());

// ## create endpoints

const express = require("express");
const shortid = require("shortid");
//create server
const server = express();
server.use(express.json()); //parse to json
//set port`
const PORT = 5000;

let users = [
  {
    id: shortid.generate(),
    name: "Vickie Nelson",
    bio: "always trying my best",
  },
];
server.get("/api/users", (req, res) => {
  if (!users) {
    res
      .status(500)
      .json({ errorMessage: "the users information could not be retrieved." });
  } else {
    res.status(200).json({ users });
  }
});

server.get("/api/users/:id", (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  if (user) {
    res.status(200).json({ user });
  } else {
    res
      .status(404)
      .json({ errorMessage: "The user with the specidied ID does not exist" });
  }
});

server.post("/api/users", (req, res) => {
  const user = req.body;

  console.log(user);
  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for this user" });
  } else {
    user.id = shortid.generate();
    users.push(user);
    res.status(201).json(users);
  }
});

server.delete("/api/users/:id", (req, res) => {
  console.log(req.params.id);
  const user = users.find((user) => user.id === req.params.id);
  if (user) {
    users = users.filter((u) => u.id != user.id);
    res.status(404).json({
      errorMessage: "The user witht the specified ID does not exist.",
    });
  }
});

server.put("/api/users/:id", (req, res) => {
  let user = users.find((user) => user.id === req.params.id);
  const changes = req.body;
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (user) {
    Object.assign(user, changes);
    res.status(200).json({ user });
  } else {
    res
      .status(404)
      .json({ errorMessage: "The user with the specified ID does not exist." });
  }
});

server.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
