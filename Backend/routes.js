const express = require('express');
const dbController = require('./controllers/dbController');
const electronController = require('./controllers/electronController');
const router = express.Router();

const debug = (req, res, next) => {
  console.log(req.body);
  return next;
}



router.post('/newLog', electronController.newLog, dbController.storeLog, (req, res) => res.sendStatus(200));

router.post('/newNTracer', electronController.newNTracer, dbController.storeNTracer, (req, res) => res.status(200).json(res.locals.id));

router.post('/updateNTracer', electronController.updatedNTracer, dbController.updateNTracer, (req, res) => res.sendStatus(200));

router.post('/newPTracer', electronController.newPTracer, dbController.storePTracer, (req, res) => res.status(200).json(res.locals.id));

router.post('/updatePTracer', electronController.updatedPTracer, dbController.updatePTracer, (req, res) => res.sendStatus(200));

router.get('/getSystem', dbController.getSystem, (req, res) => {
  res.status(200).json(res.locals.data);
});

router.post('/addSystem', dbController.storeSystem, dbController.getSystem, (req, res) => {
  res.status(200).json(res.locals.data)
});

router.delete('/deleteSystem', dbController.deleteSystem, dbController.getSystem,(req, res) => {
  res.status(200).json(res.locals.data)
});

router.post('/setSystem', dbController.setSystem, (req, res) => res.sendStatus(200));



module.exports = router;