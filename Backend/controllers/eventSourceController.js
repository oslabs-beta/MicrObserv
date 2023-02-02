const electronController = require('./electronController');

const controller = {};

controller.sendEvents = (req, res, next) => {
  try{  
    res.header('Content-Type', 'text/event-stream');
    res.header('Connection', 'keep-alive');
    res.header('Cache-Control', 'no-cache');
    res.flushHeaders(); // look into this more
  
    res.on('close', ()=>{
      console.log('Lost Connection with frontend');
    })
    electronController.connections.push(res);
  
    return next();
  }
  catch(err){
    return next({
      log: 'Error adding event source connection to electron controller, src: eventSourceController.js',
      message: { err: err }
    });
  }
}

module.exports = controller;