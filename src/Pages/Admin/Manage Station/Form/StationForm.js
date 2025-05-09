import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { Close, LocalPhone, Email, Home, LocationOn, PinDrop } from '@mui/icons-material';

// Constants for state-city data
const STATE_CITY_MAP = {
  'Uttar Pradesh': ['Noida', 'Lucknow', 'Ghaziabad'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
  'Delhi': ['New Delhi', 'Dwarka', 'Rohini'],
};
const STATES = Object.keys(STATE_CITY_MAP);

const StationForm = ({ open, onClose, onSubmit }) => {
  // Form validation schema
  const validationSchema = Yup.object().shape({
    stationName: Yup.string().required('Station name is required'),
    contact: Yup.string()
      .matches(/^[0-9]{10}$/, 'Contact number must be 10 digits')
      .required('Contact number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    address: Yup.string().required('Address is required'),
    // street: Yup.string().required('Street is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    pinCode: Yup.string() 
      .matches(/^\d{6}$/, 'PIN code must be 6 digits')
      .required('PIN code is required'),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      stationName: '',
      contact: '',
      email: '',
      address: '',
      // street: '',
      state: '',
      city: '',
      pinCode: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
      onClose();
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Add New Station</Typography>
          <IconButton onClick={handleClose} aria-label="close">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit} noValidate>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            {/* Station Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="stationName"
                name="stationName"
                label="Station Name"
                value={formik.values.stationName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.stationName && Boolean(formik.errors.stationName)}
                helperText={formik.touched.stationName && formik.errors.stationName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Contact and Email */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="contact"
                name="contact"
                label="Contact Number"
                value={formik.values.contact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.contact && Boolean(formik.errors.contact)}
                helperText={formik.touched.contact && formik.errors.contact}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPhone color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email ID"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Address */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="address"
                name="address"
                label="Address"
                multiline
                rows={3}
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Street */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="street"
                name="street"
                label="Street"
                value={formik.values.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.street && Boolean(formik.errors.street)}
                helperText={formik.touched.street && formik.errors.street}
              />
            </Grid>

            {/* State Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={formik.touched.state && Boolean(formik.errors.state)}>
                <InputLabel id="state-label">State</InputLabel>
                <Select
                  id="state"
                  name="state"
                  value={formik.values.state}
                  label="State"
                  labelId="state-label"
                  onChange={(e) => {
                    formik.setFieldValue('state', e.target.value);
                    formik.setFieldValue('city', ''); // Reset city when state changes
                  }}
                  onBlur={formik.handleBlur}
                >
                  {STATES.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.state && formik.errors.state && (
                  <Typography variant="caption" color="error">
                    {formik.errors.state}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* City Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={formik.touched.city && Boolean(formik.errors.city)}>
                <InputLabel id="city-label">City</InputLabel>
                <Select
                  id="city"
                  name="city"
                  value={formik.values.city}
                  label="City"
                  labelId="city-label"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={!formik.values.state}
                >
                  {(STATE_CITY_MAP[formik.values.state] || []).map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.city && formik.errors.city && (
                  <Typography variant="caption" color="error">
                    {formik.errors.city}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* PIN Code */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="pinCode"
                name="pinCode"
                label="PIN Code"
                value={formik.values.pinCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
                helperText={formik.touched.pinCode && formik.errors.pinCode}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PinDrop color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} variant="outlined" sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={formik.handleSubmit}
          disabled={!formik.isValid || formik.isSubmitting}
          sx={{
            backgroundColor: '#0155a5',
            '&:hover': {
              backgroundColor: '#013f71',
            },
          }}
        >
          Save Station
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StationForm;