import "./App.css";
import { useState, useEffect } from "react";
import ContactTable from "./pages/contact_table";
import ContactForm from "./components/contact_form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "./services/api";

function App() {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await getContacts();
      console.log("Fetched contacts:", response);
      setContacts(response);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, []);
  const addOrUpdateContact = async (contact) => {
    setLoading(true);
    try {
      if (contact._id) {
        await updateContact(contact._id, contact);
        toast.success("Contact updated successfully!");
      } else {
        await createContact(contact);
        toast.success("Contact created successfully!");
      }
      fetchContacts();
      setCurrentContact(null);
    } catch (error) {
      console.error("Error saving contact:", error);
    } finally {
      setLoading(false);
    }
  };
  const editContact = (contact) => {
    setCurrentContact(contact);
  };

  const removeContact = async (id) => {
    setLoading(true);
    try {
      await deleteContact(id);
      fetchContacts();
      toast.success("Contact deleted successfully!");
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Error deleting contact: " + error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="App" style={{ padding: "20px" }}>
        <ToastContainer />
        <h1>Contact Management</h1>
        {loading && <CircularProgress />}
        <ContactForm
          addOrUpdateContact={addOrUpdateContact}
          currentContact={currentContact}
        />
        <ContactTable
          contacts={contacts}
          editContact={editContact}
          deleteContact={removeContact}
          style={{ marginTop: "20px" }}
        />
      </div>
    </>
  );
}

export default App;
