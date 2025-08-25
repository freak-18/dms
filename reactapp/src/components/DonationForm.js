import React, { useState } from 'react';
import { submitDonation } from '../utils/api';

function DonationForm({ causeId, onSuccess }) {
 const [form, setForm] = useState({ amount: '', donorName: '', donorEmail: '', isAnonymous: false, message: '' });
 const [error, setError] = useState('');
 const [success, setSuccess] = useState(false);

 const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
 };

 const handleSubmit = async () => {
  setError('');
  setSuccess(false);

  if (!form.amount || form.amount <= 0) {
   setError('Enter a positive amount');
   return;
  }

  try {
   await submitDonation(causeId, form);
   setSuccess(true);
   if (onSuccess) onSuccess();
  } catch (err) {
   setError(err.response?.data?.message || 'Donation failed');
  }
 };

 return (
  <div>
   <input
    name="amount"
    aria-label="Amount"
    placeholder="Donation Amount"
    value={form.amount}
    onChange={handleChange}
   />
   <input
    name="donorName"
    aria-label="Donor Name"
    placeholder="Your Name"
    value={form.donorName}
    onChange={handleChange}
   />
   <input
    name="donorEmail"
    aria-label="Donor Email"
    placeholder="Your Email"
    value={form.donorEmail}
    onChange={handleChange}
   />
   <label>
    <input
     type="checkbox"
     name="isAnonymous"
     checked={form.isAnonymous}
     onChange={handleChange}
    /> Donate Anonymously
   </label>
   <textarea
    name="message"
    aria-label="Message"
    placeholder="Message (optional)"
    value={form.message}
    onChange={handleChange}
   />
   <button onClick={handleSubmit}>Submit</button>
   {error && <p style={{ color: 'red' }}>[Error - You need to specify the message]</p>}
   {success && <p style={{ color: 'green' }}>Donation Successful!</p>}
  </div>
 );
}

export default DonationForm;

