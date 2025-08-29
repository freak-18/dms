import React, { useEffect, useState } from 'react';
import { getActiveCauses, getNGOs } from '../utils/api';
import 'bootstrap/dist/css/bootstrap.min.css';

function CausesList() {
 const [causes, setCauses] = useState([]);
 const [ngos, setNgos] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(false);

 useEffect(() => {
  let isMounted = true;

  async function fetchData() {
   try {
    const causeData = await getActiveCauses();
    const ngoData = await getNGOs();
    if (isMounted) {
     setCauses(causeData);
     setNgos(ngoData);
    }
   } catch (err) {
    console.error('Failed to fetch causes:', err);
    if (isMounted) setError(true);
   } finally {
    if (isMounted) setLoading(false); 
   }
  }

  fetchData();
  return () => { isMounted = false; };
 }, []);

 if (loading) {
  return (
   <div className="container py-5">
    <div className="text-center">
     <div className="loading-spinner mx-auto mb-3"></div>
     <p data-testid="cause-loading" className="text-muted">Loading...</p>
    </div>
   </div>
  );
 }

 if (error) {
  return (
   <div className="container py-5">
    <div className="alert alert-danger text-center" role="alert">
     <h5 className="mb-2">⚠️ Error Loading Causes</h5>
     <p data-testid="cause-error" className="mb-0">Failed to load causes</p>
    </div>
   </div>
  );
 }

 if (causes.length === 0) {
  return (
   <div className="container py-5">
    <div className="empty-state">
     <div className="empty-state-icon">📋</div>
     <h4 className="mb-2">No Active Causes</h4>
     <p data-testid="cause-empty" className="text-muted">No causes available</p>
    </div>
   </div>
  );
 }

 const getNGOName = (id) => ngos.find(n => n.id === id)?.name || 'Unknown NGO';

 const getProgress = (current, target) => Math.min((current / target) * 100, 100);

 return (
  <div className="container py-5">
   <div className="row mb-4">
    <div className="col">
     <h2 className="font-bold text-2xl mb-2">Active Causes</h2>
     <p className="text-muted">Support meaningful causes and make a difference</p>
    </div>
   </div>

   <div className="row g-4">
    {causes.map(cause => {
     const progress = getProgress(cause.currentAmount, cause.targetAmount);
     return (
      <div key={cause.id} className="col-md-6 col-lg-4">
       <div className="card h-100 shadow-sm">
        <div className="card-body d-flex flex-column">
         <h5 className="card-title font-semibold mb-3">{cause.title}</h5>
         
         <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
           <span className="text-sm text-muted">Progress</span>
           <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
          </div>
          <div className="progress mb-2">
           <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
            role="progressbar"
           ></div>
          </div>
          <div className="d-flex justify-content-between text-sm">
           <span className="text-success font-medium">${cause.currentAmount?.toLocaleString()}</span>
           <span className="text-muted">of ${cause.targetAmount?.toLocaleString()}</span>
          </div>
         </div>

         <div className="mb-3">
          <span className="badge badge-primary">{getNGOName(cause.ngoId)}</span>
         </div>

         <div className="mt-auto">
          <button className="btn btn-primary w-100">
           Donate
          </button>
         </div>
        </div>
       </div>
      </div>
     );
    })}
   </div>
  </div>
 );
}

export default CausesList;

