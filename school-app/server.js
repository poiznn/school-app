const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); 

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createPool({
    host: 'localhost',
    user: 'tvůj_uživatel',
    password: 'tvé_heslo',
    database: 'tvá_databáze'
});


app.get('/classes', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM classes');
    res.json(rows);
});


app.post('/classes', async (req, res) => {
    const { name } = req.body;
    const [result] = await db.query('INSERT INTO classes (name) VALUES (?)', [name]);
    res.status(201).json({ id: result.insertId, name });
});


const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});
