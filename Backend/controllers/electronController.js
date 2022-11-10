const controller = {
  connections: [],
  nTracerCache: new Map(),
  pTracerCache: new Map()
};

const defaultWSMsg = {
  logs: [],
  tracers: {
    names: [],
    nTracerVals: [],
    pTracerVals: [],
  }
}
const cleanDate = time => {
  const year = time.substring(0,4);
  const month = time.substring(5,7);
  const day = time.substring(8,10);
  const t = time.substring(11,19);
  return `${month}/${day} - ${t}`;
}
/* newLog
 * Description: sends new log data to each websocket connection
 * logs are sent as an array because of desktop app formating.
 */
controller.newLog = async (req, res, next) => {
  try{
    const now = Date.now();
    const time = cleanDate(new Date(now).toISOString());

    const {src, msg} = req.body;
    const newLogs = [{
      src: src,
      msg: msg,
      time: time
    }];
    for(ws of controller.connections){
      ws.send(JSON.stringify({...defaultWSMsg, logs: newLogs}));
    }
    return next();
  }
  catch(err){
    return next({
      log: 'Error sending new log to electron app, src: electronContoller.newLog()',
      message: { err: err }
    });
  }
}
/* newNTracer
 * Description: saves network tracer data in cache
 * saves current time for finding difference upon completion in updatedNTracer
 */
controller.newNTracer = async (req, res, next) => {
  try{
    const time = Date.now();
    const {src, dest, tracerId} = req.body;
    const newTracer = {
      name: src,
      dest: dest,
      time: time
    };
    controller.nTracerCache.set(tracerId, newTracer);
    return next();
  }
  catch(err){
    return next({
      log: 'Error storing new network tracer in cache, src: electronContoller.newNTracer()',
      message: { err: err }
    });
  }
}
/* updatedNTracer
 * Description: updates network tracer time and sends new tracer data to frontend
 */
controller.updatedNTracer = async (req, res, next) => {
  try{
    const now = Date.now();
    const { tracerId } = req.body;
    if(!tracerId) {
      // console.log('TracerID: ');
      // console.log(tracerId);
      // console.log(req.body);
      return next();
    }
    // update tracer time
    const nTracer = controller.nTracerCache.get(tracerId);
    if(nTracer){
      nTracer.time = now - nTracer.time;
      console.log(`N TIME: ${nTracer.time}`);
      const pTracer = controller.pTracerCache.get(tracerId);
      // send new tracer data to frontend ws connections
      console.log(nTracer.time);
      console.log(pTracer.time);
      const newTracers = {
        names: [nTracer.name + '-' + pTracer.name],
        nTracerVals: [nTracer.time],
        pTracerVals: [pTracer.time]
      };
      for(ws of controller.connections){
        ws.send(JSON.stringify({...defaultWSMsg, tracers: newTracers}));
      }
      controller.nTracerCache.delete(tracerId);
      controller.pTracerCache.delete(tracerId);
    }
    return next();
  }
  catch(err){
    console.log(err);
    return next({
      log: 'Error sending new tracer data to electron app, src: electronContoller.updatedNTracer()',
      message: { err: err }
    });
  }
}
/* newPTracer
 * Description: saves process tracer data in cache
 * saves current time for finding difference upon completion in updatedPTracer
 */
controller.newPTracer = async (req, res, next) => {
  try{
    const time = Date.now();
    const {src, tracerId} = req.body;
    const newTracer = {
      name: src,
      time: time
    };
    controller.pTracerCache.set(tracerId, newTracer);
    return next();
  }
  catch(err){
    return next({
      log: 'Error storing new process tracer in cache, src: electronContoller.newPTracer()',
      message: { err: err }
    });
  }
}
const wait = ms => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < ms);
}
/* updatedPTracer
 * Description: updates process tracers time
 */
controller.updatedPTracer = async (req, res, next) => {
  try{
    const now = Date.now();
    const { tracerId } = req.body;
    if(!tracerId){
      console.log('No tracer ID');
    }
    let tracer = controller.pTracerCache.get(tracerId);
    // Bug: Sometimes http responses come in before tracer data has been stored in cache.
    // Temp Fix: wait 1 sec and check again
    if(!tracer){
      wait(1000);
      console.log('No tracer');
      tracer = controller.pTracerCache.get(tracerId);
    }
    if(tracer){
      tracer.time = now - tracer.time;
      console.log(`P TIME: ${tracer.time}`);
      controller.pTracerCache.set(tracerId, tracer);
      return next();
    }
  }
  catch(err){
    return next({
      log: 'Error updating process tracer\'s time, src: electronContoller.updatedPTracer()',
      message: { err: err }
    });
  }
}
module.exports = controller;