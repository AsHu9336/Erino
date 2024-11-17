import express from 'express';
import { Router } from 'express';
import Contact from '../Models/Contact.js';

const router = Router();

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// POST a new contact
router.post('/', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;

  try {
    const newContact = new Contact({ firstName, lastName, email, phoneNumber, company, jobTitle });
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT (Update) a contact
router.put('/:id', async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedContact) return res.status(404).json({ error: 'Contact not found' });
    res.json(updatedContact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a contact
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) return res.status(404).json({ error: 'Contact not found' });
    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

export default router;
