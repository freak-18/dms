import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';
import CausesList from './CausesList';

function Home() {
    const navigate = useNavigate();

 return (
  <div className="container text-center mt-5">
   <div className="p-5 bg-light rounded shadow">
    <h1 className="display-4 text-primary fw-bold">
     Welcome to Donation Platform
    </h1>
    <p className="lead text-secondary mt-3">
     Browse causes and make a difference today!
    </p>
    
    <button className="btn btn-primary btn-lg mt-3" onclick={()=> navigate(<CausesList/>)}>
     Explore Causes
    </button>
   </div>
  </div>
 );
}

export default Home;

