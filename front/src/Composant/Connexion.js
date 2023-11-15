import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./index.js";
// import "./ajouter";
// import {Link,Routes,Route} from react-router-dom;
function App()

{
    const [quizz, setBlog] = useState([]);
    const [affichage, setAffichage] = useState(false);

    const recup = async () => {
        await axios.get('http://localhost:3000/question')
            .then(res => {
                console.log(res);
                setBlog(res.data);
                setAffichage(true);
            })
            .catch(error => {
                console.error(error);
            });
    }
    const DeleteQuestion  = (questionId) => {
      // Ajoutez ici la logique pour supprimer la question avec l'ID questionId
      console.log(`Supprimer la question avec l'ID ${questionId}`);
    };
    
    
    

    useEffect(() => {
        recup();
    }, []);

    return (
      
        <div className = "App">
            <h1>Blog </h1>
            <form>

            </form>
            
            {affichage ? quizz.map(utilisateurs => (
                <div key={utilisateurs.utilisateur_.id}>
                    <fieldset>
                        <p>id : {utilisateur.utilisateur_id}</p>
                        <p>Email: {utilisateur.email}</p>
                        <p>Mot de passe : {utilisateurs.mot_de_passe}</p>
                        <p> Nom : {utilisateur.nom}</p>
                        <p>Prenom : {utilisateurs.prenom}</p>
                    </fieldset>
                </div>
            )) : <p>Chargement en cours...</p>}
        </div>
    );

}

export default App;