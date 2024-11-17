import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, CircularProgress } from '@mui/material';

const ContactForm = ({ addOrUpdateContact, currentContact }) => {
    const [contact, setContact] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: '',
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentContact) {
            setContact(currentContact);
        }
    }, [currentContact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        if (currentContact) {
            if (window.confirm('This contact already exists. Do you want to update it?')) {
                addOrUpdateContact(contact);
                setLoading(false);

                setContact({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    company: '',
                    jobTitle: '',
                });
            }
        } else {
            addOrUpdateContact(contact);
            setLoading(false);
            setContact({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                company: '',
                jobTitle: '',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={contact.firstName}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={contact.lastName}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        type="email"
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="phoneNumber"
                        value={contact.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Company"
                        name="company"
                        value={contact.company}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Job Title"
                        name="jobTitle"
                        value={contact.jobTitle}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        {loading ? <CircularProgress /> : currentContact ? 'Update Contact' : 'Add Contact'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ContactForm;
