import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DonorLogin() {
  const [credentials, setCredentials] = useState({ username: 'donor1', password: 'donor123' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (credentials.username === 'donor1' && credentials.password === 'donor123') {
      localStorage.setItem('token', 'donor-token');
      localStorage.setItem('role', 'DONOR');
      localStorage.setItem('userId', '3');
      navigate('/donor/dashboard');
    } else {
      setError('Invalid credentials. Use: donor1 / donor123');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Donor Login</h3>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <small className="text-muted">Test credentials: donor1 / donor123</small>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={credentials.username}
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      value={credentials.password}
                      onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '👁️' : '👁️🗨️'}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonorLogin;