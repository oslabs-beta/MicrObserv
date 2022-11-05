const db = require('../model.js');

controller = {};

controller.getLogs = (req, res, next) => {
  console.log("inside getLogs");
  const queryString = `SELECT * FROM Logs LIMIT 50;`;
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

controller.storeLog = (req, res, next) => {
  const {src, msg} = req.body;
  // console.log(`SRC: ${src}`);
  // console.log(`MSG: ${msg}`);
  const queryString = `INSERT INTO Logs(src, msg)
                       VALUES ($1, $2);`;
  db.query(queryString, [src, msg])
    .then(()=> next())
    .catch(() => next('error in storeLog'));
};



module.exports = controller;
