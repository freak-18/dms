import React, { useState } from 'react';
import { submitDonation } from '../utils/api';
import 'bootstrap/dist/css/bootstrap.min.css';

function DonationForm({ causeId, onSuccess }) {
 const [form, setForm] = useState({ amount: '', donorName: '', donorEmail: '', isAnonymous: false, message: '' });
 const [error, setError] = useState('');
 const [success, setSuccess] = useState(false);
 const [loading, setLoading] = useState(false);
 const [fieldErrors, setFieldErrors] = useState({});

 const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  
  // Clear field-specific error when user starts typing
  if (fieldErrors[name]) {
   setFieldErrors({ ...fieldErrors, [name]: '' });
  }
  if (error) setError('');
 };



 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess(false);
  setFieldErrors({});

  if (!form.amount || form.amount <= 0) {
   setError('Enter a positive amount');
   return;
  }
  
  setLoading(true);

  try {
   await submitDonation(causeId, form);
   setSuccess(true);
   setForm({ amount: '', donorName: '', donorEmail: '', isAnonymous: false, message: '' });
   if (onSuccess) onSuccess();
  } catch (err) {
   setError(err.response?.data?.message || 'Donation failed');
  } finally {
   setLoading(false);
  }
 };

 const quickAmounts = [25, 50, 100, 250];

 return (
  <form onSubmit={handleSubmit}>
   {success && (
    <div className="alert alert-success" data-testid="donation-success">
     <strong>✓ Success!</strong> Donation Successful!
    </div>
   )}
   
   {error && (
    <div className="alert alert-danger" data-testid="donation-error">
     <strong>⚠️ Error:</strong> {error}
    </div>
   )}

   <div className="form-group mb-3">
    <label className="form-label" htmlFor="amount">Amount *</label>
    <div className="input-group">
     <span className="input-group-text">$</span>
     <input
      id="amount"
      name="amount"
      type="number"
      min="1"
      step="0.01"
      className="form-control"
      aria-label="Amount"
      placeholder="Enter amount"
      value={form.amount}
      onChange={handleChange}
      required
     />
    </div>
    <div className="mt-2">
     {quickAmounts.map(amount => (
      <button
       key={amount}
       type="button"
       className={`btn btn-sm me-2 mb-1 ${
        form.amount === amount.toString() ? 'btn-primary' : 'btn-outline-primary'
       }`}
       onClick={() => setForm({ ...form, amount: amount.toString() })}
      >
       ${amount}
      </button>
     ))}
    </div>
   </div>

   <div className="form-group mb-3">
    <div className="form-check">
     <input
      type="checkbox"
      className="form-check-input"
      id="isAnonymous"
      name="isAnonymous"
      checked={form.isAnonymous}
      onChange={handleChange}
     />
     <label className="form-check-label" htmlFor="isAnonymous">
      Donate Anonymously
     </label>
    </div>
   </div>

   {!form.isAnonymous && (
    <>
     <div className="form-group mb-3">
      <label className="form-label" htmlFor="donorName">Your Name *</label>
      <input
       id="donorName"
       name="donorName"
       type="text"
       className="form-control"
       aria-label="Donor Name"
       placeholder="Enter your full name"
       value={form.donorName}
       onChange={handleChange}
       required={!form.isAnonymous}
      />
     </div>

     <div className="form-group mb-3">
      <label className="form-label" htmlFor="donorEmail">Your Email *</label>
      <input
       id="donorEmail"
       name="donorEmail"
       type="email"
       className="form-control"
       aria-label="Donor Email"
       placeholder="Enter your email address"
       value={form.donorEmail}
       onChange={handleChange}
       required={!form.isAnonymous}
      />
     </div>
    </>
   )}

   <div className="form-group mb-4">
    <label className="form-label" htmlFor="message">Message (Optional)</label>
    <textarea
     id="message"
     name="message"
     className="form-control"
     rows="3"
     aria-label="Message"
     placeholder="Leave a message of support..."
     value={form.message}
     onChange={handleChange}
    />
   </div>

   <button 
    type="submit" 
    className="btn btn-primary w-100"
    disabled={loading}
   >
    {loading ? (
     <>
      <span className="loading-spinner me-2"></span>
      Processing...
     </>
    ) : (
     'Submit'
    )}
   </button>
  </form>
 );
}

export default DonationForm;

