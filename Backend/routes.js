const express = require('express');
const dbController = require('./controllers/dbController');
const electronController = require('./controllers/electronController');
const router = express.Router();

const debug = (req, res, next) => {
  console.log(req.body);
  return next;
}

router.post('/newLog', electronController.newLog, dbController.storeLog, (req, res) => {
  res.sendStatus(200);
});
router.post('/newNTracer', debug, (req, res) => {
  res.status(200).send(res.locals.id);
});
router.post('/updateNTracer', debug, (req, res) => {
  res.sendStatus(200);
});
router.post('/newPTracer', debug, (req, res) => {
  res.status(200).send(res.locals.id);
});
router.post('/updatePTracer', debug, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;