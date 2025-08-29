import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
 const navigate = useNavigate();

 return (
  <div>
   {/* Hero Section */}
   <section className="bg-primary text-white py-5">
    <div className="container">
     <div className="row align-items-center min-vh-50">
      <div className="col-lg-6">
       <h1 className="display-3 font-bold mb-4">
        Welcome to Donation Platform
       </h1>
       <p className="lead mb-4">
        Connect with meaningful causes and make a lasting impact. 
        Browse causes and make a difference today!
       </p>
       <div className="d-flex gap-3 flex-wrap">
        <button 
         className="btn btn-light btn-lg" 
         onClick={() => navigate("/causes")}
        >
         Explore Causes
        </button>
        <button className="btn btn-outline-light btn-lg">
         Learn More
        </button>
       </div>
      </div>
      <div className="col-lg-6 text-center">
       <div className="display-1 mb-3">🌟</div>
       <h3 className="h5 text-light">Making Impact Together</h3>
      </div>
     </div>
    </div>
   </section>

   {/* Features Section */}
   <section className="py-5 bg-light">
    <div className="container">
     <div className="row text-center mb-5">
      <div className="col">
       <h2 className="h3 font-semibold mb-3">Why Choose Our Platform?</h2>
       <p className="text-secondary">Trusted by thousands of donors worldwide</p>
      </div>
     </div>
     <div className="row g-4">
      <div className="col-md-4">
       <div className="card h-100 border-0 shadow-sm">
        <div className="card-body text-center p-4">
         <div className="text-primary mb-3" style={{ fontSize: '2.5rem' }}>🔒</div>
         <h5 className="font-semibold mb-3">Secure Donations</h5>
         <p className="text-secondary mb-0">
          Your donations are processed securely with industry-standard encryption.
         </p>
        </div>
       </div>
      </div>
      <div className="col-md-4">
       <div className="card h-100 border-0 shadow-sm">
        <div className="card-body text-center p-4">
         <div className="text-primary mb-3" style={{ fontSize: '2.5rem' }}>🎯</div>
         <h5 className="font-semibold mb-3">Direct Impact</h5>
         <p className="text-secondary mb-0">
          100% of your donation goes directly to the cause you choose to support.
         </p>
        </div>
       </div>
      </div>
      <div className="col-md-4">
       <div className="card h-100 border-0 shadow-sm">
        <div className="card-body text-center p-4">
         <div className="text-primary mb-3" style={{ fontSize: '2.5rem' }}>📊</div>
         <h5 className="font-semibold mb-3">Track Progress</h5>
         <p className="text-secondary mb-0">
          See real-time updates on how your contributions are making a difference.
         </p>
        </div>
       </div>
      </div>
     </div>
    </div>
   </section>

   {/* CTA Section */}
   <section className="py-5">
    <div className="container">
     <div className="row justify-content-center">
      <div className="col-lg-8 text-center">
       <div className="card border-0 shadow">
        <div className="card-body p-5">
         <h3 className="font-semibold mb-3">Ready to Make a Difference?</h3>
         <p className="text-secondary mb-4">
          Join our community of changemakers and start supporting causes that matter to you.
         </p>
         <button 
          className="btn btn-primary btn-lg" 
          onClick={() => navigate("/causes")}
         >
          Start Donating Today
         </button>
        </div>
       </div>
      </div>
     </div>
    </div>
   </section>
  </div>
 );
}

export default Home;

