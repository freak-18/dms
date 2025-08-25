import React, { useEffect, useState } from 'react';
import { getActiveCauses, getNGOs } from '../utils/api';

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
   } catch {
    if (isMounted) setError(true);
   } finally {
    if (isMounted) setLoading(false); // ✅ always ends loading
   }
  }

  fetchData();
  return () => { isMounted = false; };
 }, []);

 if (loading) return <p data-testid="cause-loading">Loading...</p>;
 if (error) return <p data-testid="cause-error">Failed to load causes</p>;
 if (causes.length === 0) return <p data-testid="cause-empty">No causes available</p>;

 const getNGOName = (id) => ngos.find(n => n.id === id)?.name || 'Unknown NGO';

 return (
  <div>
   {causes.map(cause => (
    <div key={cause.id}>
     <h3>{cause.title}</h3>
     <p>{getNGOName(cause.ngoId)}</p>
     <button>Donate</button>
    </div>
   ))}
  </div>
 );
}

export default CausesList;

