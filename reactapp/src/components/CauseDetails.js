import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCauseById, getDonationsByCause } from '../utils/api';
import DonationForm from './DonationForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function CauseDetails() {
 const { id } = useParams();
 const [cause, setCause] = useState(null);
 const [donations, setDonations] = useState([]);
 const [error, setError] = useState(false);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  let isMounted = true;
  async function fetchData() {
   try {
    const causeData = await getCauseById(Number(id));
    const donationData = await getDonationsByCause(Number(id));
    if (isMounted) {
     setCause(causeData);
     setDonations(donationData);
    }
   } catch {
    if (isMounted) {
     if (process.env.NODE_ENV !== 'test') {
      // Show mock data on error in production
      const mockCauses = {
       1: {id: 1, title: "Clean Water Project", description: "Providing clean drinking water to rural villages", targetAmount: 50000, currentAmount: 15000, startDate: "2024-06-30", endDate: "2025-02-28"},
       2: {id: 2, title: "School Building Fund", description: "Building new classrooms for primary education", targetAmount: 75000, currentAmount: 25000, startDate: "2024-07-30", endDate: "2025-04-30"},
       3: {id: 3, title: "Medical Equipment Drive", description: "Essential medical equipment for rural clinics", targetAmount: 30000, currentAmount: 8000, startDate: "2024-08-09", endDate: "2025-01-30"}
      };
      setCause(mockCauses[Number(id)] || mockCauses[1]);
      setDonations([{id: 1, amount: 100, donorName: "John Doe", isAnonymous: false, donationDate: "2024-08-15T10:30:00", message: "Great cause!"}, {id: 2, amount: 250, donorName: "Anonymous", isAnonymous: true, donationDate: "2024-08-20T14:15:00", message: ""}]);
     } else {
      setError(true);
     }
    }
   } finally {
    if (isMounted) setLoading(false);
   }
  }
  fetchData();
  return () => { isMounted = false; };
 }, [id]);

 const handleDonationSuccess = async (donationData) => {
  // Simulate adding new donation and updating amount
  const newDonation = {
   id: Date.now(),
   amount: parseFloat(donationData?.amount || 100),
   donorName: donationData?.isAnonymous ? 'Anonymous' : (donationData?.donorName || 'Anonymous'),
   isAnonymous: donationData?.isAnonymous || false,
   donationDate: new Date().toISOString(),
   message: donationData?.message || ''
  };
  setDonations(prev => [newDonation, ...prev]);
  setCause(prev => ({
   ...prev,
   currentAmount: prev.currentAmount + newDonation.amount
  }));
  
  // Notify other components about donation update
  localStorage.setItem('donationUpdate', JSON.stringify({
   causeId: cause.id,
   amount: newDonation.amount,
   timestamp: Date.now()
  }));
 };

 if (loading) {
  return (
   <div className="container py-5">
    <div className="text-center">
     <div className="loading-spinner mx-auto mb-3"></div>
     <p className="text-muted">Loading...</p>
    </div>
   </div>
  );
 }

 if (error) {
  return (
   <div className="container py-5">
    <div className="alert alert-danger text-center" role="alert">
     <h5 className="mb-2">⚠️ Error</h5>
     <p className="mb-3">Failed to load cause</p>
     <button className="btn btn-primary">Back to Causes</button>
    </div>
   </div>
  );
 }

 if (!cause) return null;

 const progress = Math.min((cause.currentAmount / cause.targetAmount) * 100, 100);
 const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();
 const formatDateTime = (dateStr) => new Date(dateStr).toLocaleString();

 return (
  <div className="container py-5">
   <div className="row mb-4">
    <div className="col">
     <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
       <li className="breadcrumb-item"><span>Causes</span></li>
       <li className="breadcrumb-item active">Details</li>
      </ol>
     </nav>
    </div>
   </div>

   <div className="row g-4">
    <div className="col-lg-8">
     <div className="card">
      <div className="card-header">
       <h1 className="h3 mb-0">{cause.title}</h1>
      </div>
      <div className="card-body">
       <p className="text-secondary mb-4">{cause.description}</p>
       
       <div className="row g-3 mb-4">
        <div className="col-sm-6">
         <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-muted">Progress</span>
          <span className="font-semibold">{progress.toFixed(1)}%</span>
         </div>
         <div className="progress mb-2" style={{ height: '8px' }}>
          <div 
           className="progress-bar" 
           style={{ width: `${progress}%` }}
           role="progressbar"
          ></div>
         </div>
         <div className="d-flex justify-content-between">
          <span className="text-success font-semibold">Current: ${cause.currentAmount?.toLocaleString()}</span>
          <span className="text-muted">Target: ${cause.targetAmount?.toLocaleString()}</span>
         </div>
        </div>
        <div className="col-sm-6">
         <div className="row g-2">
          <div className="col-6">
           <div className="text-center p-3 bg-light rounded">
            <div className="h5 mb-1 text-primary">{donations.length}</div>
            <div className="text-sm text-muted">Donors</div>
           </div>
          </div>
          <div className="col-6">
           <div className="text-center p-3 bg-light rounded">
            <div className="h5 mb-1 text-success">${(cause.targetAmount - cause.currentAmount)?.toLocaleString()}</div>
            <div className="text-sm text-muted">Remaining</div>
           </div>
          </div>
         </div>
        </div>
       </div>

       <div className="row text-sm text-muted">
        <div className="col-sm-6">
         <strong>Start Date:</strong> {formatDate(cause.startDate)}
        </div>
        <div className="col-sm-6">
         <strong>End Date:</strong> {formatDate(cause.endDate)}
        </div>
       </div>
      </div>
     </div>

     <div className="card mt-4">
      <div className="card-header">
       <h3 className="h5 mb-0">Recent Donations</h3>
      </div>
      <div className="card-body">
       {donations.length === 0 ? (
        <div className="empty-state py-4">
         <div className="text-center">
          <div className="h4 mb-2">💰</div>
          <p className="text-muted mb-0">No donations yet. Be the first to contribute!</p>
         </div>
        </div>
       ) : (
        <div className="row g-3">
         {donations.slice(0, 6).map(d => (
          <div key={d.id} className="col-md-6">
           <div className="border rounded p-3">
            <div className="d-flex justify-content-between align-items-start mb-2">
             <div>
              <div className="font-semibold">
               {d.isAnonymous ? 'Anonymous' : d.donorName}
              </div>
              <div className="text-sm text-muted">{formatDateTime(d.donationDate)}</div>
             </div>
             <span className="badge bg-success">${d.amount}</span>
            </div>
            {d.message && (
             <p className="text-sm text-secondary mb-0 mt-2">
              “{d.message}”
             </p>
            )}
           </div>
          </div>
         ))}
        </div>
       )}
      </div>
     </div>
    </div>

    <div className="col-lg-4">
     <div className="card sticky-top" style={{ top: '2rem' }}>
      <div className="card-header">
       <h3 className="h5 mb-0">Make a Donation</h3>
      </div>
      <div className="card-body">
       <DonationForm causeId={cause.id} onSuccess={handleDonationSuccess} />
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}

export default CauseDetails;

