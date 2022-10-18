const express = require('express');
const fetch = require('node-fetch');

let fetchData = false;
// MIDDLEWARE
// startLoop function simulates console logs and http.requests for both microservices
const startLoop = async (req, res, next) => {
    // Helper function - recursively makes a request to get data from Service B if fetchData is true
    const getDataFromServiceB = async () => {
        const { reqTime , timeOut} = req.query;
        try{
            const response = await fetch(`http://localhost:8081/demo?reqTime=${reqTime}`);
            if(response.status === 200){
                const data = await response.json();
                console.log("Data from Service B: ", data);
                if (fetchData) setTimeout(getDataFromServiceB, timeOut);
            }else{
                return console.log("HTTP Error: ", response);
            }   
        }
        catch(err){
            console.log("Error getting data from Service B: ", err)
        }
    }
    setTimeout(getDataFromServiceB, 1000);
    return next()
}

const fetchDataTrue = (req, res, next) => {
    fetchData = true;
    return next()
}

const fetchDataFalse = (req, res, next) => {
    fetchData = false;
    return next()
}

// SERVER
const serviceA = express();
const PORT = 8080;
serviceA.use('/start', fetchDataTrue, startLoop, (req, res)=> res.status(200).send('Started'));
serviceA.use('/stop', fetchDataFalse, (req, res) => res.status(200).send('Stopped'));

serviceA.listen(PORT, () => console.log(`Service A running on port: ${PORT}...`));

