import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NGODashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCause, setNewCause] = useState({
    title: '',
    description: '',
    targetAmount: '',
    category: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = () => {
    setDashboard({
      totalCauses: 2,
      totalRaised: 23000,
      causes: [
        {id: 1, title: 'Clean Water Project', description: 'Providing clean water to rural areas', targetAmount: 50000, currentAmount: 15000, category: 'Environment'},
        {id: 2, title: 'Education Fund', description: 'Supporting education in underserved communities', targetAmount: 30000, currentAmount: 8000, category: 'Education'}
      ]
    });
    setLoading(false);
  };

  const handleCreateCause = (e) => {
    e.preventDefault();
    
    const newCauseWithId = {
      ...newCause,
      id: Date.now(),
      currentAmount: 0,
      ngoId: 1
    };
    
    // Add to existing causes
    setDashboard(prev => ({
      ...prev,
      totalCauses: (prev?.totalCauses || 0) + 1,
      causes: [...(prev?.causes || []), newCauseWithId]
    }));
    
    setShowCreateForm(false);
    setNewCause({ title: '', description: '', targetAmount: '', category: '', startDate: '', endDate: '' });
  };

  if (loading) return <div className="container py-5"><p>Loading...</p></div>;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>NGO Dashboard</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateForm(true)}
        >
          Create New Cause
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Causes</h5>
              <h3 className="text-primary">{dashboard?.totalCauses || 0}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Raised</h5>
              <h3 className="text-success">${dashboard?.totalRaised || 0}</h3>
            </div>
          </div>
        </div>
      </div>

      {showCreateForm && (
        <div className="card mb-4">
          <div className="card-header">
            <h5>Create New Cause</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleCreateCause}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={newCause.title}
                  onChange={(e) => setNewCause({...newCause, title: e.target.value})}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={newCause.description}
                  onChange={(e) => setNewCause({...newCause, description: e.target.value})}
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Target Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newCause.targetAmount}
                      onChange={(e) => setNewCause({...newCause, targetAmount: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                      className="form-control"
                      value={newCause.category}
                      onChange={(e) => setNewCause({...newCause, category: e.target.value})}
                    >
                      <option value="">Select Category</option>
                      <option value="Education">Education</option>
                      <option value="Health">Health</option>
                      <option value="Environment">Environment</option>
                      <option value="Poverty">Poverty</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={newCause.startDate}
                      onChange={(e) => setNewCause({...newCause, startDate: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={newCause.endDate}
                      onChange={(e) => setNewCause({...newCause, endDate: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">Create Cause</button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h5>My Causes</h5>
        </div>
        <div className="card-body">
          {dashboard?.causes?.length > 0 ? (
            <div className="row">
              {dashboard.causes.map(cause => (
                <div key={cause.id} className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h6 className="card-title">{cause.title}</h6>
                      <p className="card-text small">{cause.description}</p>
                      <div className="d-flex justify-content-between">
                        <span>Raised: ${cause.currentAmount || 0}</span>
                        <span>Goal: ${cause.targetAmount}</span>
                      </div>
                      <div className="progress mt-2" style={{ height: '8px' }}>
                        <div 
                          className="progress-bar bg-success" 
                          style={{width: `${Math.min(((cause.currentAmount || 0) / (cause.targetAmount || 1)) * 100, 100).toFixed(1)}%`}}
                          role="progressbar"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No causes created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NGODashboard;