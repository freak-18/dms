import React from 'react';

function About() {
  return (
    
    <div>
      {/* Hero Section */}
      <br />
      <section className="relative bg-blue-600 py-12 text-center">
        <h1 className="text-4xl font-bold mb-2">About This Platform</h1>
        <p className="text-lg max-w-2xl mx-auto">
          This platform enables you to support NGOs and contribute to various causes.
        </p>
      </section>
      <br />
      <br />

      {/* Main Content */}
      <section className="p-5 bg-white shadow-lg rounded-xl mt-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-6">
          We provide a seamless way to contribute to meaningful causes, ensuring that every donation
          has a direct impact on the communities and initiatives it supports.
        </p>
      </section>

      <br />
      <br />

      {/* Donation Process */}
      <section className="p-4 bg-white shadow-lg rounded-xl mt-8 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          The donation process works
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Browse through active causes and choose the one you want to support.</li>
          <li>View details about the cause, including its mission and impact goals.</li>
          <li>Make a secure donation with a few simple steps.</li>
          <li>Track how your contribution is making a difference.</li>
        </ul>
      </section>
    </div>
  );
}

export default About;
	1. 