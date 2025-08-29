import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 font-bold mb-3">About This Platform</h1>
          <p className="lead mb-0">
            This platform enables you to support NGOs and contribute to various causes.
          </p>
        </div>
      </section>

      <div className="container py-5">
        {/* Mission Section */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body text-center p-5">
                <div className="mb-4">
                  <div className="display-1 text-primary">🌟</div>
                </div>
                <h2 className="h3 font-semibold mb-4">Our Mission</h2>
                <p className="text-secondary mb-0 lead">
                  We provide a seamless way to contribute to meaningful causes, ensuring that every donation
                  has a direct impact on the communities and initiatives it supports.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <div className="card">
              <div className="card-header text-center">
                <h3 className="h4 font-semibold mb-0">The donation process works</h3>
              </div>
              <div className="card-body">
                <div className="row g-4">
                  <div className="col-md-6 col-lg-3">
                    <div className="text-center">
                      <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                        <span className="h4 mb-0">1</span>
                      </div>
                      <h5 className="font-semibold mb-2">Browse Causes</h5>
                      <p className="text-secondary small mb-0">
                        Browse through active causes and choose the one you want to support.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3">
                    <div className="text-center">
                      <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                        <span className="h4 mb-0">2</span>
                      </div>
                      <h5 className="font-semibold mb-2">View Details</h5>
                      <p className="text-secondary small mb-0">
                        View details about the cause, including its mission and impact goals.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3">
                    <div className="text-center">
                      <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                        <span className="h4 mb-0">3</span>
                      </div>
                      <h5 className="font-semibold mb-2">Donate Securely</h5>
                      <p className="text-secondary small mb-0">
                        Make a secure donation with a few simple steps.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3">
                    <div className="text-center">
                      <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                        <span className="h4 mb-0">4</span>
                      </div>
                      <h5 className="font-semibold mb-2">Track Impact</h5>
                      <p className="text-secondary small mb-0">
                        Track how your contribution is making a difference.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <div className="card bg-light">
              <div className="card-body p-4">
                <h4 className="font-semibold mb-3">Ready to Make a Difference?</h4>
                <p className="text-secondary mb-4">
                  Join thousands of donors who are already making an impact through our platform.
                </p>
                <button className="btn btn-primary btn-lg">
                  Explore Causes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;