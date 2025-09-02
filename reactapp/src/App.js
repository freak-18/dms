import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import CausesList from './components/CausesList';
import CauseDetails from './components/CauseDetails';
import Login from './components/Login';
import Register from './components/Register';
import AdminLogin from './components/AdminLogin';
import NGOLogin from './components/NGOLogin';
import DonorLogin from './components/DonorLogin';
import NGODashboard from './components/NGODashboard';
import CauseSearch from './components/CauseSearch';
import AdminDashboard from './components/AdminDashboard';
import DonorDashboard from './components/DonorDashboard';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/causes" element={<CausesList />} />
        <Route path="/causes/:id" element={<CauseDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/ngo/login" element={<NGOLogin />} />
        <Route path="/donor/login" element={<DonorLogin />} />
        <Route path="/ngo/dashboard" element={<NGODashboard />} />
        <Route path="/donor/dashboard" element={<DonorDashboard />} />
        <Route path="/search-causes" element={<CauseSearch />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
