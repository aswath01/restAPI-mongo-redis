const express = require("express");
const app = express();
// import routing from './src/Routes/routes';
const routing = require("./src/Routes/routes");
const bodyParser = require('body-parser');
const db = require('./src/db/mongoose');
const dbconnect = require("./src/db/mongoose");
const redisConnect = require("./src/db/redis");
class start {
  async start() { 
    app.listen(3000, () => {
      console.log(`server is running on the port ${3000}`);
    });
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    console.log(await dbconnect());
    console.log(await redisConnect());
    app.use(routing);
  }
}

const s = new start();
s.start();
