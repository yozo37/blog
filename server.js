const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
let cors = require('cors');
const bcrypt = require('bcrypt');
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    database:process.env.DB_DATA ,
    user:process.env.DB_USER ,
    password:process.env.DB_PWD ,
});
app.use(cors());
 
app.get('/api/articles/', async (req, res) => {
    console.log("lancement de la connexion");
    const conn = await pool.getConnection();
    console.log("lancement de la requete");
    const rows = await conn.query("SELECT * FROM articles");
    console.log(rows);
    res.status(200).json(rows);
});

app.post('/api/articles/', async (req, res) => {
    try {
        const { titre, contenu, utilisateur_id } = req.body;

        if (!titre || !contenu || !utilisateur_id) {
            return res.status(400).json({ error: 'Title, content, and user ID are required.' });
        }

        const conn = await pool.getConnection();
        try {
            const result = await conn.query('INSERT INTO Articles (titre, contenu, utilisateur_id) VALUES (?, ?, ?)', [titre, contenu, utilisateur_id]);
            const articleId = Number(result.insertId);
            res.status(201).json({ article_id: articleId, message: 'Article created successfully.' });
        } finally {
            conn.release(); 
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/api/utilisateurs/', async (req, res) => {
    console.log("lancement de la connexion");
    const conn = await pool.getConnection();
    console.log("lancement de la requete");
    const rows = await conn.query("SELECT * FROM utilisateurs");
    console.log(rows);
    res.status(200).json(rows);
});

app.get('/api/utilisateurs/:id', async (req, res) => {
    console.log("lancement de la connexion");
    const conn = await pool.getConnection();
    console.log("lancement de la requete");
    const rows = await conn.query("SELECT * FROM utilisateurs WHERE utilisateur_id = ?", [req.params.id]);
    console.log(rows);
    res.status(200).json(rows);
});

app.post('/api/utilisateurs/', async (req, res) => {
     console.log(req.body);
    try {
        const { email, mot_de_passe, nom, prenom } = req.body;

        if (!email || !mot_de_passe || !nom || !prenom) {
            return res.status(400).json({ error: 'Email, password, name, and surname are required.' });
        }

        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

        const conn = await pool.getConnection();
        const result = await conn.query('INSERT INTO Utilisateurs (email, mot_de_passe, nom, prenom) VALUES (?, ?, ?, ?)', [email, hashedPassword, nom, prenom]);

        const utilisateurId = Number(result.insertId);

        res.status(201).json({ utilisateur_id: utilisateurId, message: 'User created successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/api/articles/', async (req, res) => {
    try {
        const { titre, contenu, utilisateurs_id, date_creation } = req.body;

        if (!titre || !contenu || ! utilisateurs_id|| !date_creation) {
            return res.status(400).json({ error: 'Email, password, name, and surname are required.' });
        }

        const conn = await pool.getConnection();
        const result = await conn.query('INSERT INTO Utilisateurs (titre, contenu, utilisateurs_id,date_creation) VALUES (?, ?, ?, ?)', [titre, contenu, utilisateurs_id, date_creation]);


        const utilisateurId = Number(result.insertId);

        res.status(201).json({ utilisateur_id: utilisateurId, message: 'User created successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});



app.listen(3000, () => {
    console.log("Serveur a l'ecoute jdeig");
});