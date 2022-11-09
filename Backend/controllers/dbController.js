const db = require('../model.js');

controller = {};

const cleanTimeStampData = time => {
  const year = time.substring(0,4);
  const month = time.substring(6,8);
  const day = time.substring(9,11);
  const t = time.substring(12,20);
  return `${month}/${day} - ${t}`;
}

controller.getLogs = async (ws) => {
  try{
    const queryString = `SELECT * FROM Logs
                         ORDER BY time DESC LIMIT 50;`;
    const data = await db.query(queryString);
    for(const log of data.rows){
      log.time = cleanTimeStampData(JSON.stringify(log.time));
    }
    ws.send(JSON.stringify({
      logs: data.rows,
      tracers: {
        names: [],
        nTracerVals: [],
        pTracerVals: [],
      },
    }));
  }
  catch(err){
    console.log(err)
  }
}

controller.getTracers = async (ws) => {
  try{
    const queryString = `SELECT * FROM nTracers n
                         INNER JOIN pTracers p
                         ON p.traceId = n.traceId
                         WHERE nCompleted = true
                         ORDER BY nStartTime LIMIT 50;`;
    const data = await db.query(queryString);
    console.log('TRACERS:');
    console.log(data.rows);
    ws.send(JSON.stringify({
      logs: [],
      tracers: {
        names: [],
        nTracerVals: [],
        pTracerVals: [],
      },
    }));
  }
  catch(err){
    console.log(err);
  }
}

controller.storeLog = (req, res, next) => {
  try{
    const {src, msg} = req.body;
    const queryString = `INSERT INTO Logs(src, msg)
                         VALUES ($1, $2);`;
    db.query(queryString, [src, msg])
      .then(()=> next())
      .catch(err => 
        next({
          log: 'Error storing log in db, src: dbContoller.storeLog()',
          message: { err: err }
        })
    );
  }
  catch(err){
    return next({
      log: 'Error storing network tracer in db, src: dbContoller.storeNTracer()',
      message: { err: err }
    });
  }
};

controller.storeNTracer = (req, res, next) => {
  const { src, dest, tracerId } = req.body;
  const queryString = `INSERT INTO nTracers(nSrc, dest, traceId)
                       VALUES ($1, $2, $3) RETURNING id;`;
  db.query(queryString, [src, dest, tracerId])
    .then(data => {
      res.locals.id = data.rows[0].id;
      return next()
    })
    .catch(err => 
      next({
        log: 'Error storing network tracer in db, src: dbContoller.storeNTracer()',
        message: { err: err }
      })
    );
};

controller.updateNTracer = (req, res, next) => {
  const { id } = req.body;
  const queryString = `UPDATE nTracers SET nCompleted = TRUE
                       WHERE id = $1;`;
  db.query(queryString, [id])
    .then(()=> next())
    .catch(err => 
      next({
        log: 'Error updating network tracer in db, src: dbContoller.updateNTracer()',
        message: { err: err }
      })  
    );
}

controller.storePTracer = (req, res, next) => {
  const { src, tracerId } = req.body;
  const queryString = `INSERT INTO pTracers(pSrc, traceId)
                       VALUES ($1, $2) RETURNING id;`;
  db.query(queryString, [src, tracerId])
    .then(data => {
      res.locals.id = data.rows[0].id;
      return next()
    })
    .catch(err => 
      next({
        log: 'Error storing process tracer db, src: dbContoller.storePTracer()',
        message: { err: err }
      })  
    );
};

controller.updatePTracer = (req, res, next) => {
  const { id } = req.body;
  const queryString = `UPDATE pTracers SET pCompleted = TRUE
                       WHERE id = $1;`;
  db.query(queryString, [id])
    .then(()=> next())
    .catch(err => 
      next({
        log: 'Error updating process tracer in db, src: dbContoller.updatePTracer()',
        message: { err: err }
      })  
    );
}
/* CREATE TABLE IF NOT EXISTS systems(
                    id serial,
                    systemName VARCHAR NOT NULL
                    URI VARCHAR NOT NULL
                    PRIMARY KEY(id));`*/
controller.storeSystem =(req,res,next) => {
  
    console.log("Inside storeSystems in DB controllers");
    const {systemName, uri} = req.body
    const queryString = `INSERT into systems (systemName, uri)
                        VALUES ($1, $2);`;
    db.query(queryString, [systemName, uri])
    .then(() => next())
    .catch(err => 
      next({
        log: 'Error storing process tracer db, src: dbContoller.storeSystem()',
        message: { err: err }
      })  
    );
  
}

controller.getSystem =(req,res,next) => {
  const queryString = `SELECT * FROM systems`;
  db.query(queryString)
  .then(data => {
    //console.log(data.rows[0])
    res.locals.data = data.rows;
    return next()
  })
  .catch(err => 
    next({
      log: 'Error storing process tracer db, src: dbContoller.storeSystem()',
      message: { err: err }
    })  
  );
}
controller.setSystem = (req, res, next) => {
  try{
    const { uri } = req.body;
    db.updateDbConnection(uri);
    return next();
  }
  catch(err){
    return next({
      log: 'Error updating db connection, src: dbContoller.setSystem()',
      message: { err: err }
    }) 
  }
}

controller.deleteSystem = (req,res,next) => {
  try{
    const {id} = req.body;
    const queryString = `DELETE FROM systems WHERE id = $1`
    db.query(queryString, [id])
    .then(() => next()) 
  }
  catch(err){
    return next({
      log: 'Error deleting system, src: dbContoller.deleteSystem()',
      message: { err: err }
    }) 
  }
}
module.exports = controller;
