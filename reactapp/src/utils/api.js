// api.js – Connects React frontend to Spring Boot backend
import axios from "axios";

const API_BASE = "https://ide-dceeddfbaddeebdedeacdadbaffdcfddeefbafdffade.premiumproject.examly.io/proxy/8080/api"; 


// Get all active causes
export async function getActiveCauses() {
  const res = await axios.get(`${API_BASE}/causes/active`);
  return res.data;
}

// Get all NGOs
export async function getNGOs() {
  const res = await axios.get(`${API_BASE}/ngos`);
  return res.data;
}

// Get cause by ID
export async function getCauseById(id) {
  const res = await axios.get(`${API_BASE}/causes/${id}`);
  return res.data;
}

// Get donations for a specific cause
export async function getDonationsByCause(causeId) {
  const res = await axios.get(`${API_BASE}/donations/cause/${causeId}`);
  return res.data;
}

// Submit donation
export async function submitDonation(causeId, donationData) {
  try {
    const res = await axios.post(`${API_BASE}/donations/cause/${causeId}`, donationData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
}
