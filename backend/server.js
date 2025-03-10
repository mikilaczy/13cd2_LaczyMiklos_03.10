const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");

app.use(cors());
app.use(bodyparser.json());

const db = mysql.createConnection(
    {
        user: "root",
        host: "localhost",
        port: "3307",
        password: "",
        database: "felveteli"
    })
    
app.get("/", (req, res) => {
    res.send("A szerver működik!")
})

app.listen(3001, () => {
    console.log('A szerver a 3001-es porton fut!')
})