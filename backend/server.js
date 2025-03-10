const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    port: "3307",
    password: "",
    database: "felveteli"
});

app.get("/", (req, res) => {
    res.send("A szerver működik!");
});


app.get("/elozetes-rangsor", (req, res) => {
    const sql = `
        SELECT 
            d.nev AS "Tanuló neve",
            t.agazat AS Ágazat,
            (d.hozott * 2 + d.kpmagy + d.kpmat) AS osszpont
        FROM 
            diakok d
        JOIN 
            jelentkezesek j ON d.oktazon = j.diak
        JOIN 
            tagozatok t ON j.tag = t.akod
        WHERE 
            j.hely = 1  -- Only first-choice applications
        ORDER BY 
            d.nev ASC;
    `;
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: "Hiba!" });
        return res.json(result);
    });
});

app.get("/agazatok", (req, res) => {
    const query = "SELECT DISTINCT agazat FROM tagozatok";
   
    db.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

app.listen(5000, () => {
    console.log('A szerver a 5000-es porton fut!');
});


