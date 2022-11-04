const db = require('../model.js');

controller = {};

controller.getLogs = (req, res, next) => {
  console.log("inside getLogs");
  const queryString = `SELECT * FROM Logs ORDER BY id DESC LIMIT 50 ;`;
  db.query(queryString)
    .then((response) => {
      res.locals.logs = response.rows;
      console.log("res.locals.logs", res.locals.logs);
      return next();
    })
    .catch(() => next('error in addLogs'));
}

controller.getTracers = (req, res, next) => {
  console.log("inside getTracers");
  const queryString = `SELECT * FROM Tracers LIMIT 50;`;
  db.query(queryString)
    .then((response) => {
      console.log("response from getTracers", response)
      res.locals.tracers = response.rows;
      return next();
    })
    .catch(() => next('error in getTracers'));
}

controller.addLog = (req, res, next) => {
  console.log("inside addLog");
  const queryString = `INSERT INTO Logs
  (id, src, msg, time)
  VALUES (DEFAULT, $1, $2, DEFAULT);`;
  const params = [req.body.src, req.body.msg];
  db.query(queryString, params)
    .then((response) => {
      console.log(response)
      next()
    })
    .catch(() => next('error in addLog'));
};

//                         id SERIAL,
//                         src VARCHAR NOT NULL,
//                         dest VARCHAR,
//                         traceId VARCHAR,
//                         sender BOOLEAN NOT NULL,
//                         startTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//                         endTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//                         completed BOOLEAN DEFAULT FALSE,
//                         PRIMARY KEY(id));



controller.addTracer = (req, res, next) => {
  console.log("inside addTracer");
  const queryString = `INSERT INTO Tracers
  (src, dest, traceId, sender)
  VALUES ($1, $2, $3, $4);`;
  const params = [req.body.src, req.body.dest, req.body.traceId, req.body.sender];
  db.query(queryString, params)
    .then((response) => {
      console.log(response)
      next()
    })
    .catch(() => next('error in addTracer'))
}

module.exports = controller;
