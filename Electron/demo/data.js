
const log = {
  src: 'serviceA',
  msg: 'Service A fetching data from Service B',
  time: '2022-10-20 17:05:05.732507'
}

const newLog = (src, msg, time) => {
  const nLog = {...log};
  if(src) nLog.src = src;
  if(msg) nLog.msg = msg;
  if(time) nLog.time = time;
  return nLog;
}

const tracer = {
  src: 'serviceA',
  dest: 'serviceB',
  traceId: '',
  sender: true,
  starttime: '2022-10-20 17:05:05.732507',
  endtime: '2022-10-20 17:05:10.732507',
  completed: true
}

const newTracer = (src, dest, traceId, sender, starttime, endtime, completed)=> {
  const nTracer = {...tracer};
  if(src) nTracer.src = src;
  if(dest) nTracer.dest = dest;
  if(traceId) nTracer.traceId = traceId;
  if(sender) nTracer.sender = sender;
  if(starttime) nTracer.starttime = starttime;
  if(endtime) nTracer.endtime = endtime;
  if(completed !== undefined) nTracer.completed = completed;
  return nTracer;
}
const data = {
  logs: [],
  tracers: [],
  generateLogs: (serviceName) => {
    if(data.logs.length > 15) return;
    for(let i=0; i<2; i++){
      const msg = i % 2 === 0 ? 'fetching data from b' : 'data received';
      data.logs.push(
        newLog(serviceName, msg, new Date().toISOString().slice(0, 19).replace('T', ' '))
      );
    }
  },
  generateTracers: (serviceName) => {
    if(data.tracers.length > 15) return;
    for(let i=0; i<2; i++){
      const starttime = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const endtime = new Date().toISOString().slice(0, 19).replace('T', ' ');
      if(i % 2 === 0){ // sender
        data.tracers.push(
          newTracer(
            serviceName, 
            'serviceB', 
            `${i}`,
            true,
            starttime,
            endtime,
            true
          )
        );
      }
      else{ // receiver
        data.tracers.push(
          newTracer(
            'serviceB',
            'serviceB',
            `${i-1}`,
            false,
            starttime,
            endtime,
            true
          )
        );
      }
    }
  }
}

// data.generateLogs = serviceName => {
//   if(data.logs.length > 15) return;
//   for(let i=0; i<2; i++){
//     const msg = i % 2 === 0 ? 'fetching data from b' : 'data received';
//     data.logs.push(
//       newLog(serviceName, msg, new Date().toISOString().slice(0, 19).replace('T', ' '))
//     );
//   }
// }

// data.generateTracers = serviceName => {
//   if(data.tracers.length > 15) return;
//   for(let i=0; i<2; i++){
//     const starttime = new Date().toISOString().slice(0, 19).replace('T', ' ');
//     const endtime = new Date().toISOString().slice(0, 19).replace('T', ' ');
//     if(i % 2 === 0){ // sender
//       data.tracers.push(
//         newTracer(
//           serviceName, 
//           'serviceB', 
//           `${i}`,
//           true,
//           starttime,
//           endtime,
//           true
//         )
//       );
//     }
//     else{ // receiver
//       data.tracers.push(
//         newTracer(
//           'serviceB',
//           'serviceB',
//           `${i-1}`,
//           false,
//           starttime,
//           endtime,
//           true
//         )
//       );
//     }
//   }
// }

module.exports = data;