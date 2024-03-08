const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path'); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dokumentation.html')); // Sänder dokumentation.html-filen som respons
});

//lyssna på port 3000
app.listen(3000);
console.log("servern körs på port 3000");

//importera MYSQL-modulen för hantering av databasanslutning
const mysql = require("mysql");
//skapar en anslutning till MYSQL-databasen 
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Mydatabas"
    multipleStatements: true,

  });

  db.connect((err) => {
    if (err) {
      console.error('Ett fel inträffade vid anslutning till databasen: ' + err.stack);
      return;
    }
    console.log('Ansluten till databasen med ID ' + db.threadId);
  });



  // Hantera en GET-förfrågan till rotadressen genom att skicka en HTML-fil

