require('dotenv/config');
require('./src/entity/dbConnection');
const bodyParser = require("body-parser");
const express = require('express') ;
const dinasaureRouter = require('./src/router/dinasaure.router');
const authRouter = require('./src/router/auth.router');
const app = express();
// midlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
app.use('/api/dinasaures',dinasaureRouter);
app.use('/api/login',authRouter);
app.listen(process.env.APP_PORT,()=>{
    console.log('Application start on port '+process.env.APP_PORT);
});