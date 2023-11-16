// App.js
import React from 'react';
import './App.css';
import Connexion from './Composant/Connexion';
import Inscription from './Composant/Inscriptions';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/connexion">Connexion</Link>
          <Link to="/inscription">Inscription</Link>
        </nav>

        <Routes>
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/Inscription" element={<Inscription />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

