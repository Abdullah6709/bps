import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  IconButton,
  Pagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ContactCard = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    address: '',
  });

  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddContact = () => {
    if (!formData.name || !formData.number) return;

    if (editIndex !== null) {
      const updatedContacts = [...contacts];
      updatedContacts[editIndex] = formData;
      setContacts(updatedContacts);
      setEditIndex(null);
    } else {
      setContacts((prev) => [...prev, formData]);
    }

    setFormData({ name: '', contactNumber: '', email: '', address: '' });
  };

  const handleDelete = (index) => {
    setContacts((prev) => prev.filter((_, i) => i !== index));
    if (editIndex === index) setEditIndex(null); // Reset edit if deleting that item
  };

  const handleEdit = (index) => {
    setFormData(contacts[index]);
    setEditIndex(index);
  };

  const handleView = (contact) => {
    alert(
      `Viewing Contact:\n\nName: ${contact.name}\nNumber: ${contact.contactNumber}\nEmail: ${contact.email}\nAddress: ${contact.address}`
    );
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={3}>
      <Typography variant="h6" mb={2}>Contact List</Typography>

      <Grid container spacing={2} mb={2}>
        <Grid size={{xs:12, sm:3}}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid size={{xs:12, sm:3}}>
          <TextField
            label="Contact Number"
            name="number"
            value={formData.contactNumber}
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid size={{xs:12, sm:3}}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid size={{xs:12, sm:3}}>
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Button
          variant="contained"
          onClick={handleAddContact}
          sx={{ backgroundColor: '#004C99' }}
        >
          {editIndex !== null ? 'Update Contact' : '+ Contact'}
        </Button>
        <TextField
          size="small"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#004C99' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>S.No.</TableCell>
              <TableCell sx={{ color: '#fff' }}>Name</TableCell>
              <TableCell sx={{ color: '#fff' }}>Number</TableCell>
              <TableCell sx={{ color: '#fff' }}>Email</TableCell>
              <TableCell sx={{ color: '#fff' }}>Address</TableCell>
              <TableCell sx={{ color: '#fff' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.number}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.address}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleView(contact)} color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(index)} color="warning">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                  <BrokenImageIcon fontSize="large" color="disabled" />
                  <Typography variant="body1" color="textSecondary">
                    Data Not Found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Pagination count={1} shape="rounded" size="small" />
      </Box>
    </Box>
  );
};

export default ContactCard;
