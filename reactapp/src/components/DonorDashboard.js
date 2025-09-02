import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DonorDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [causes, setCauses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
    fetchCauses();
  }, []);

  const fetchDashboard = () => {
    setDashboard({ 
      featuredCauses: [
        {id: 1, title: 'Clean Water Project', description: 'Providing clean water to rural areas', targetAmount: 50000, currentAmount: 15000, category: 'Environment'},
        {id: 2, title: 'Education Fund', description: 'Supporting education in underserved communities', targetAmount: 30000, currentAmount: 8000, category: 'Education'}
      ]
    });
  };

  const fetchCauses = () => {
    const defaultCauses = [
      {id: 1, title: 'Clean Water Project', description: 'Providing clean water to rural areas', targetAmount: 50000, currentAmount: 15000, category: 'Environment'},
      {id: 2, title: 'Education Fund', description: 'Supporting education in underserved communities', targetAmount: 30000, currentAmount: 8000, category: 'Education'},
      {id: 3, title: 'Medical Equipment Drive', description: 'Essential medical equipment for rural clinics', targetAmount: 25000, currentAmount: 12000, category: 'Health'},
      {id: 4, title: 'Food Security Program', description: 'Fighting hunger in urban slums', targetAmount: 40000, currentAmount: 18000, category: 'Poverty'}
    ];
    setCauses(defaultCauses);
    setLoading(false);
  };

  const handleSearch = (query = searchQuery, category = selectedCategory) => {
    const allCauses = [
      {id: 1, title: 'Clean Water Project', description: 'Providing clean water to rural areas', targetAmount: 50000, currentAmount: 15000, category: 'Environment'},
      {id: 2, title: 'Education Fund', description: 'Supporting education in underserved communities', targetAmount: 30000, currentAmount: 8000, category: 'Education'},
      {id: 3, title: 'Medical Equipment Drive', description: 'Essential medical equipment for rural clinics', targetAmount: 25000, currentAmount: 12000, category: 'Health'},
      {id: 4, title: 'Food Security Program', description: 'Fighting hunger in urban slums', targetAmount: 40000, currentAmount: 18000, category: 'Poverty'}
    ];
    
    const filtered = allCauses.filter(cause => {
      const matchesSearch = !query || 
        cause.title.toLowerCase().includes(query.toLowerCase()) ||
        cause.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || cause.category === category;
      return matchesSearch && matchesCategory;
    });
    
    setCauses(filtered);
  };

  const filteredCauses = causes;

  if (loading) return <div className="container py-5"><p>Loading...</p></div>;

  return (
    <div className="container py-5">
      <h2>Donor Dashboard</h2>
      
      {/* Search Section */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search causes..."
                value={searchQuery}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchQuery(value);
                  if (searchTimeout) clearTimeout(searchTimeout);
                  setSearchTimeout(setTimeout(() => handleSearch(value, selectedCategory), 300));
                }}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-control"
                value={selectedCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedCategory(value);
                  handleSearch(searchQuery, value);
                }}
              >
                <option value="">All Categories</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Environment">Environment</option>
                <option value="Poverty">Poverty</option>
              </select>
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Causes */}
      <div className="mb-4">
        <h4>Featured Causes</h4>
        <div className="row">
          {dashboard?.featuredCauses?.slice(0, 3).map(cause => (
            <div key={cause.id} className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="card-title">{cause.title}</h6>
                  <p className="card-text small">{cause.description?.substring(0, 100)}...</p>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Raised: ${cause.currentAmount || 0}</span>
                    <span>Goal: ${cause.targetAmount}</span>
                  </div>
                  <div className="progress mb-3" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar bg-success" 
                      style={{width: `${Math.min(((cause.currentAmount || 0) / (cause.targetAmount || 1)) * 100, 100).toFixed(1)}%`}}
                      role="progressbar"
                    />
                  </div>
                  <button 
                    className="btn btn-primary btn-sm w-100"
                    onClick={() => navigate(`/causes/${cause.id}`)}
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Causes */}
      <div>
        <h4>All Causes ({causes.length})</h4>
        <div className="row">
          {causes.map(cause => (
            <div key={cause.id} className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="card-title">{cause.title}</h6>
                  {cause.category && (
                    <span className="badge bg-secondary mb-2">{cause.category}</span>
                  )}
                  <p className="card-text small">{cause.description?.substring(0, 100)}...</p>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Raised: ${cause.currentAmount || 0}</span>
                    <span>Goal: ${cause.targetAmount}</span>
                  </div>
                  <div className="progress mb-3" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar bg-success" 
                      style={{width: `${Math.min(((cause.currentAmount || 0) / (cause.targetAmount || 1)) * 100, 100).toFixed(1)}%`}}
                      role="progressbar"
                    />
                  </div>
                  <button 
                    className="btn btn-primary btn-sm w-100"
                    onClick={() => navigate(`/causes/${cause.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DonorDashboard;