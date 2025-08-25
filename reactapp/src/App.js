import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import CausesList from './components/CausesList';
import CauseDetails from './components/CauseDetails';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/causes" element={<CausesList />} />
        <Route path="/causes/:id" element={<CauseDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
