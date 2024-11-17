import axios from 'axios';

const API_BASE_URL = "http://localhost:5000/contacts";

export const getContacts = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch contacts: ${error.message}`);
  }
};

export const createContact = async (contact) => {
  try {
    const response = await axios.post(API_BASE_URL, contact);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create contact: ${error.message}`);
  }
};

export const updateContact = async (id, contact) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, contact);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update contact: ${error.message}`);
  }
};

export const deleteContact = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete contact: ${error.message}`);
  }
};
