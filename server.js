const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path'); 

const app = express();

app.use(cors());
app.use(express.json()); //middleware för att tolka JSON-body i requests
app.use(express.static('public'));


//lyssna på port 3000
app.listen(3000);
console.log("servern körs på port 3000");

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
    // skickar ett felmeddelande istället för att krascha servern
      console.error('Ett fel inträffade vid anslutning till databasen: ' + err.stack);
      //Avslutat processen om man inte kan ansluta till databasen
      process.exit(1); 
      return;
    }
    console.log('Ansluten till databasen med ID ' + db.threadId);
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dokumentation.html')); // skickar dokumentation-hrml som respons 
});

//GET /users
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        // Skickar ett serverfel 
        res.status(500).send('Ett serverfel inträffade vid hämtning av användare');
      } else {
        // Skickar resultaten som JSON
        res.json(results);
      }
    });
  });

  //GET/users/:id 
  app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) {
        res.status(500).send('Ett serverfel inträffade');
      } else if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).send('Användaren hittades inte.');
      }
    });
  });



