import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './HomePage'; // Import correct de HomePage
import './App.css';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/about">À propos</Link></li>
          </ul>
        </nav>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Ajoutez d'autres routes si nécessaire */}
            {/* <Route path="/about" element={<AboutPage />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
