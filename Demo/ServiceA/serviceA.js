const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config()
// REQUIRE MODULE IN EACH SERVER
/* SETUP PACKAGE WITH OPTIONS
 * 
 */
const options = {
   
}
require('../../microbserv_package/microbserv/start').start(options, 'serviceA');

let fetchData = false;
// MIDDLEWARE
// startLoop function simulates console logs and http.requests for both microservices
const startLoop = async (req, res, next) => {
    // Helper function - recursively makes a request to get data from Service B if fetchData is true
    const getDataFromServiceB = async () => {
        const { reqTime , timeOut } = req.query;
        try{
            const longerProcess = Math.floor(Math.random() * 3);
            const response = await fetch(`http://localhost:8081/demo?reqTime=${reqTime + longerProcess}`);
            if(response.status === 200){
                const data = await response.json();
                console.log('Data received from Service B.');
                if (fetchData) {
                  const throwErr = Math.floor(Math.random() * 10) === 1;
                  setTimeout(getDataFromServiceB, timeOut);
                  if(throwErr) throw new Error('test error');
                  // throw new Error('test error');
                }
            }else{
                return console.log("HTTP Error: ", response);
            }   
        }
        catch(err){
            console.log("Error getting data from Service B: ");
            console.log(JSON.stringify(err));
        }
    }
    setTimeout(getDataFromServiceB, 1000);
    return next()
}

const fetchDataTrue = (req, res, next) => {
    console.log('Demo started.')
    fetchData = true;
    return next()
}

const fetchDataFalse = (req, res, next) => {
    console.log('Demo stopped.')
    fetchData = false;
    return next()
}

// SERVER
const serviceA = express();
const PORT = 8082;
serviceA.use('/start', fetchDataTrue, startLoop, (req, res)=> res.status(200).send('Started'));
serviceA.use('/stop', fetchDataFalse, (req, res) => res.status(200).send('Stopped'));

serviceA.listen(PORT, () => console.log(`Started Service A, running on port: ${PORT}...`));

