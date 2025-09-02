import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function CauseSearch() {
  const navigate = useNavigate();
  const [causes, setCauses] = useState([]);
  const [filteredCauses, setFilteredCauses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ngos, setNgos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterCauses();
  }, [searchTerm, causes]);

  const fetchData = async () => {
    try {
      const [causesRes, ngosRes] = await Promise.all([
        fetch('http://localhost:8080/api/causes/active'),
        fetch('http://localhost:8080/api/ngos')
      ]);
      
      const causesData = await causesRes.json();
      const ngosData = await ngosRes.json();
      
      setCauses(causesData);
      setNgos(ngosData);
      setFilteredCauses(causesData);
    } catch (err) {
      console.error('Failed to fetch data');
    }
  };

  const filterCauses = () => {
    if (!searchTerm) {
      setFilteredCauses(causes);
      return;
    }
    
    const filtered = causes.filter(cause => 
      cause.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cause.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getNGOName(cause.ngoId).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCauses(filtered);
  };

  const getNGOName = (ngoId) => {
    const ngo = ngos.find(n => n.id === ngoId);
    return ngo ? ngo.name : 'Unknown NGO';
  };

  const getProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Search & Donate to Causes</h2>
      
      <div className="row mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search causes by title, description, or NGO name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {filteredCauses.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">
              {searchTerm ? 'No causes found matching your search.' : 'No active causes available.'}
            </div>
          </div>
        ) : (
          filteredCauses.map(cause => {
            const progress = getProgress(cause.currentAmount, cause.targetAmount);
            return (
              <div key={cause.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{cause.title}</h5>
                    <p className="card-text flex-grow-1">{cause.description}</p>
                    
                    <div className="mb-3">
                      <small className="text-muted">By: {getNGOName(cause.ngoId)}</small>
                    </div>
                    
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <small>Progress</small>
                        <small>{progress.toFixed(0)}%</small>
                      </div>
                      <div className="progress mb-2">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="d-flex justify-content-between">
                        <small className="text-success">${cause.currentAmount}</small>
                        <small className="text-muted">of ${cause.targetAmount}</small>
                      </div>
                    </div>
                    
                    <button 
                      className="btn btn-primary"
                      onClick={() => navigate(`/causes/${cause.id}`)}
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default CauseSearch;