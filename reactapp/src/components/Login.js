import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', role: 'DONOR' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        
        if (user.role === 'NGO_ADMIN') navigate('/ngo-dashboard');
        else if (user.role === 'SYSTEM_ADMIN') navigate('/admin-dashboard');
        else navigate('/causes');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center mb-4">Login</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select 
                    className="form-select" 
                    value={form.role}
                    onChange={(e) => setForm({...form, role: e.target.value})}
                  >
                    <option value="DONOR">Donor</option>
                    <option value="NGO_ADMIN">NGO Admin</option>
                    <option value="SYSTEM_ADMIN">System Admin</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.username}
                    onChange={(e) => setForm({...form, username: e.target.value})}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                    required
                  />
                </div>
                
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
              
              <div className="text-center mt-3">
                <button 
                  className="btn btn-link"
                  onClick={() => navigate('/register')}
                >
                  Don't have an account? Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;