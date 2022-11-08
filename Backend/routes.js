const express = require('express');
const dbController = require('./controllers/dbController');
const electronController = require('./controllers/electronController');
const router = express.Router();

const debug = (req, res, next) => {
  console.log(req.body);
  return next;
}

router.get('/getSystem', dbController.getSystem, (req, res) => {
  console.log("Inside getSystems route")
  console.log(res.locals.data);
  res.status(200).json(res.locals.data);
});

router.post('/newLog', electronController.newLog, dbController.storeLog, (req, res) => res.sendStatus(200));

router.post('/newNTracer', electronController.newNTracer, dbController.storeNTracer, (req, res) => res.status(200).json(res.locals.id));

router.post('/updateNTracer', electronController.updatedNTracer, dbController.updateNTracer, (req, res) => res.sendStatus(200));

router.post('/newPTracer', electronController.newPTracer, dbController.storePTracer, (req, res) => res.status(200).json(res.locals.id));

router.post('/updatePTracer', electronController.updatedPTracer, dbController.updatePTracer, (req, res) => res.sendStatus(200));

router.post('/addSystem', dbController.storeSystem, (req, res) => {
  console.log("Inside add systems route");
  console.log(res.locals.id);
  res.sendStatus(200);
});



router.delete('/deleteSystem', (req, res) => res.sendStatus(200));

module.exports = router;