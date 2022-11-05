const controller = {
  connections: []
};
const defaultWSMsg = {
  logs: [],
  tracers: {
    names: [],
    nTracerVals: [],
    pTracerVals: [],
  }
}
controller.newLog = async (req, res, next) => {
  try{
    const {src, msg} = req.body;
    const time = Date.now();
    for(ws of controller.connections){
      // console.log(`SRC: ${src}`);
      // console.log(`MSG: ${msg}`);
      // console.log(ws);
      ws.send(JSON.stringify({...defaultWSMsg, logs: [{
        src: src,
        msg: msg,
        time: time
      }]}));
      next();
    }
  }catch(err){
    console.log('Error sending new log to electron app', err);
    return next({err: err});
  }
}

module.exports = controller;