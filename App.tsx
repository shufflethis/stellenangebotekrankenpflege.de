// HR-UPDATER: v1.0
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import AutorSeite from './pages/AutorSeite';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/autor/thomas-sander" element={<AutorSeite />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
