import React, { useState } from 'react';
import axios from 'axios';

export default function Inscription() {
  // Constante pour le formulaire d'inscription
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [mot_de_passe, setMotDePasse] = useState('');

  // Fonction pour le formulaire d'inscription
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, mot_de_passe ,nom ,prenom };
    console.log(data);
    axios('http://localhost:3000/api/utilisateurs', {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(() => {
        console.log('Nouvel utilisateur ajouté');
      })
      .catch(error => console.error('Erreur lors de l\'ajout de l\'utilisateur:', error));
  }

  return (
    <div>
      Inscription
      <form onSubmit={handleSubmit}>
        <label>Nom</label>
        <input type="text" required value={nom} onChange={(e) => setNom(e.target.value)} />
        <label>Prénom</label>
        <input type="text" required value={prenom} onChange={(e) => setPrenom(e.target.value)} />
        <label>Email</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Mot de passe</label>
        <input type="password" required value={mot_de_passe} onChange={(e) => setMotDePasse(e.target.value)} />
        <button type="submit">Inscription</button>
      </form>
    </div>
  )
}
