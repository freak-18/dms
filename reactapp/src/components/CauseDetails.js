import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCauseById, getDonationsByCause } from '../utils/api';
import DonationForm from './DonationForm';

function CauseDetails() {
 const { id } = useParams();
 const [cause, setCause] = useState(null);
 const [donations, setDonations] = useState([]);
 const [error, setError] = useState(false);

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
    if (isMounted) setError(true);
   }
  }
  fetchData();
  return () => { isMounted = false; };
 }, [id]);

 const handleDonationSuccess = async () => {
  // refresh donations and cause progress
  const updatedDonations = await getDonationsByCause(Number(id));
  const updatedCause = await getCauseById(Number(id));
  setDonations(updatedDonations);
  setCause(updatedCause);
 };

 if (error) return <p>Failed to load cause</p>;
 if (!cause) return <p>Loading...</p>;

 const progress = Math.min((cause.currentAmount / cause.targetAmount) * 100, 100);

 return (
  <div>
   <h2>{cause.title}</h2>
   <p>{cause.description}</p>
   <div style={{ background: '#eee', borderRadius: '5px', overflow: 'hidden', margin: '0.5rem 0' }}>
    <div style={{ width: `${progress}%`, background: '#4caf50', color: 'white', padding: '2px' }}>
     {cause.currentAmount} / {cause.targetAmount}
    </div>
   </div>

   <h3>Donate</h3>
   <DonationForm causeId={cause.id} onSuccess={handleDonationSuccess} />

   <h3>Past Donations</h3>
   {donations.length === 0 ? (
    <p>No donations yet</p>
   ) : (
    donations.map(d => (
     <div key={d.id} style={{ borderBottom: '1px solid #ccc', margin: '0.5rem 0' }}>
      <p>{d.isAnonymous ? 'Anonymous Donor' : d.donorName}</p>
      <p>Amount: {d.amount}</p>
      {d.message && <p>Message: {d.message}</p>}
     </div>
    ))
   )}
  </div>
 );
}

export default CauseDetails;

