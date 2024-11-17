import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function ContactTable({
  contacts = [],
  editContact,
  deleteContact,
}) {
  console.log(contacts);
  return (
    <div>
      <h1 style={{ marginBottom: "20px" , textAlign :"center"}}>Contacts</h1>
      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>First Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Last Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Phone Number</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Company</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Job Title</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!contacts || contacts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No contacts found
              </TableCell>
            </TableRow>
          ) : (
            contacts.map((contact) => (
              <TableRow key={contact._id}>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phoneNumber}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.jobTitle}</TableCell>
                <TableCell>
                  <IconButton>
                    <Edit onClick={() => editContact(contact)} />
                  </IconButton>
                  <IconButton>
                    <Delete onClick={() => deleteContact(contact._id)} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
