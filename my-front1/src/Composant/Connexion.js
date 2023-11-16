// Connexion.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Connexion() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [affichage, setAffichage] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '', 
  });

  const recup = async () => {
    try {
      const response = await axios.get('http://localhost:3000/utilisateurs');
      console.log(response.data);
      setUtilisateurs(response.data);
      setAffichage(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    recup();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire soumis avec les données :', formData);
    
    localStorage.setItem('formData', JSON.stringify(formData));
  };

  return (
    <div className="App">
      <h1>Blog </h1>
      <form onSubmit={handleSubmit}>
        <label>
          Entrer votre nom
          <input type="text" name="nom" value={formData.nom} onChange={handleChange} />
        </label>
        <br />
        <label>
          Entrer votre prénom
          <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} />
        </label>
        <br />
        <label>
          Entrez votre adresse mail
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Mot de passe
          <input type="password" name="motDePasse" value={formData.motDePasse} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Soumettre</button>
      </form>

      {affichage ? (
        utilisateurs.map((utilisateur) => (
          <div key={utilisateur.id}>
            <fieldset>
              <p>id : {utilisateur.id}</p>
              <p>Email: {utilisateur.email}</p>
              <p>Mot de passe : {utilisateur.mot_de_passe}</p>
              <p>Nom : {utilisateur.nom}</p>
              <p>Prenom : {utilisateur.prenom}</p>
            </fieldset>
          </div>
        ))
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}
