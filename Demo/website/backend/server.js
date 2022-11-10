const express = require("express");
const app = express();
const PORT = 3002;
const path = require("path")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/')));

app.get("/",(req, res) => {
    res.sendFile(path.join(__dirname,'../client/index.html/')); 
  });

app.listen(PORT, () => {
    console.log('server listening on PORT: ', PORT);
});