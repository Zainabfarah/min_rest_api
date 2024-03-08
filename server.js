const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

//lyssna på port 3000
app.listen(3000);
console.log("servern körs på port 3000");

//importera MYSQL-modulen för hantering av databasanslutning
const mysql = require("mysql");
//skapar en anslutning till MYSQL-databasen 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Mydatabas'
  });

