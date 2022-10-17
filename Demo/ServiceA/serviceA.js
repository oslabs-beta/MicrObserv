const express = require('express');
const serviceA = express();

const PORT = 8080;


//node fetch
//fetch from localhost 8081
const getDataFromServiceB = (req ,res, next) => {

}

//console.log the data and redirect to getDataFromServiceB
const receivingData = (req, res, next) => {

}

serviceA.get('/', getDataFromServiceB, (req, res) => {

})




serviceA.listen(PORT, () =>{
    console.log(`Service A running on port: ${PORT}...`)
})
