try {
    const { email, mot_de_passe, nom, prenom } = req.body;

    if (!email || !mot_de_passe || !nom || !prenom) {
        return res.status(400).json({ error: 'Email, password, name, and surname are required.' });
    }
   const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
     conn = await pool.getConnection();
    const result = await conn.query('INSERT INTO Utilisateurs (email, mot_de_passe, nom, prenom) VALUES (?, ?, ?, ?)', [email, hashedPassword, nom, prenom]);

    

    const utilisateurId = Number(result.insertId);

    res.status(201).json({ utilisateur_id: utilisateurId, message: 'User created successfully.' });
} catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
}