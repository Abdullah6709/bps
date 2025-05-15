import React from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const years = Array.from(
  { length: 30 },
  (_, i) => new Date().getFullYear() - i
);

// Function to generate random date within a range
const randomDate = (start, end) => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

const validationSchema = Yup.object({
  registrationNumber: Yup.string().required("Required"),
  registrationDate: Yup.string().required("Required"),
  regExpiryDate: Yup.string().required("Required"),
  vehicleModel: Yup.string().required("Required"),
  manufactureYear: Yup.string().required("Required"),
  ownedBy: Yup.string().required("Required"),
  currentLocation: Yup.string().required("Required"),
  dateofPurchase: Yup.string().required("Required"),
  purchasedFrom: Yup.string(),
  PurchasedUnder: Yup.string(),
  purchasePrice: Yup.number(),
  depreciation: Yup.number(),

  currentValue: Yup.number(),
  currentInsuranceProvider: Yup.string(),
  policyNumber: Yup.string(),
  policyType: Yup.string(),
  policyStartDate: Yup.date(),
  policyEndDate: Yup.date().min(
    Yup.ref("policyStartDate"),
    "End date must be after start date"
  ),
  policyPremium: Yup.number(),
  lastFitnessRenewalDate: Yup.date(),
  currentFitnessValidUpto: Yup.date().min(
    Yup.ref("lastFitnessRenewalDate"),
    "Must be after renewal date"
  ),
  firstRegValidUpto: Yup.date(),
  renewalDate: Yup.date(),
  renewalValidUpto: Yup.date().min(
    Yup.ref("renewalDate"),
    "Must be after renewal date"
  ),
  addcomment: Yup.string(),
});

const EditVehicle = () => {
  // Generate random data for the form
  const randomData = {
    registrationNumber: `MH${Math.floor(Math.random() * 100)}-${Math.floor(Math.random() * 10000)}`,
    registrationDate: randomDate(new Date(2015, 0, 1), new Date()),
    regExpiryDate: randomDate(new Date(), new Date(2025, 11, 31)),
    vehicleModel: ["Toyota Innova", "Maruti Swift", "Hyundai Creta", "Honda City"][Math.floor(Math.random() * 4)],
    manufactureYear: years[Math.floor(Math.random() * years.length)],
    ownedBy: ["Company", "Employee", "Third Party"][Math.floor(Math.random() * 3)],
    currentLocation: ["Mumbai", "Delhi", "Bangalore", "Hyderabad"][Math.floor(Math.random() * 4)],
    dateofPurchase: randomDate(new Date(2015, 0, 1), new Date()),
    purchasedFrom: ["Dealer", "Private Owner", "Auction"][Math.floor(Math.random() * 3)],
    PurchasedUnder: ["Company Name", "Employee Name", "Lease"][Math.floor(Math.random() * 3)],
    purchasePrice: Math.floor(Math.random() * 2000000) + 500000,
    depreciation: Math.floor(Math.random() * 500000) + 100000,
    currentValue: Math.floor(Math.random() * 1500000) + 300000,
    currentInsuranceProvider: ["ICICI Lombard", "Bajaj Allianz", "HDFC Ergo", "Tata AIG"][Math.floor(Math.random() * 4)],
    policyNumber: `POL${Math.floor(Math.random() * 10000)}${Math.floor(Math.random() * 10000)}`,
    policyType: ["Comprehensive", "Third Party"][Math.floor(Math.random() * 2)],
    policyStartDate: randomDate(new Date(2022, 0, 1), new Date()),
    policyEndDate: randomDate(new Date(), new Date(2024, 11, 31)),
    policyPremium: Math.floor(Math.random() * 50000) + 10000,
    lastFitnessRenewalDate: randomDate(new Date(2021, 0, 1), new Date()),
    currentFitnessValidUpto: randomDate(new Date(), new Date(2024, 11, 31)),
    firstRegValidUpto: randomDate(new Date(2020, 0, 1), new Date(2023, 11, 31)),
    renewalDate: randomDate(new Date(2022, 0, 1), new Date()),
    renewalValidUpto: randomDate(new Date(), new Date(2025, 11, 31)),
    addcomment: Math.random() > 0.5 ? "Vehicle is in good condition" : "Needs servicing soon",
  };

  const formik = useFormik({
    initialValues: randomData,
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box p={3} bgcolor="#f5f7f6">
      <Typography variant="h5" mb={3} color="primary">
        Edit Vehicle Details
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h6" mb={2}>
          Vehicle Details
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{xs:12}}>
            <TextField
              label="Registration Number"
              name="registrationNumber"
              fullWidth
              value={formik.values.registrationNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.registrationNumber &&
                Boolean(formik.errors.registrationNumber)
              }
              helperText={
                formik.touched.registrationNumber &&
                formik.errors.registrationNumber
              }
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              label="Registration Date"
              name="registrationDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={formik.values.registrationDate}
              onChange={formik.handleChange}
              error={
                formik.touched.registrationDate &&
                Boolean(formik.errors.registrationDate)
              }
              helperText={
                formik.touched.registrationDate &&
                formik.errors.registrationDate
              }
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              label="Reg. Expiry Date"
              name="regExpiryDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={formik.values.regExpiryDate}
              onChange={formik.handleChange}
              error={
                formik.touched.regExpiryDate &&
                Boolean(formik.errors.regExpiryDate)
              }
              helperText={
                formik.touched.regExpiryDate && formik.errors.regExpiryDate
              }
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              label="Make/Model"
              name="vehicleModel"
              fullWidth
              value={formik.values.vehicleModel}
              onChange={formik.handleChange}
              error={
                formik.touched.vehicleModel && Boolean(formik.errors.vehicleModel)
              }
              helperText={formik.touched.vehicleModel && formik.errors.vehicleModel}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              select
              label="Year of Manufacture"
              name="manufactureYear"
              fullWidth
              value={formik.values.manufactureYear}
              onChange={formik.handleChange}
              error={
                formik.touched.manufactureYear &&
                Boolean(formik.errors.manufactureYear)
              }
              helperText={
                formik.touched.manufactureYear &&
                formik.errors.manufactureYear
              }
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              label="Owned By"
              name="ownedBy"
              fullWidth
              value={formik.values.ownedBy}
              onChange={formik.handleChange}
              error={formik.touched.ownedBy && Boolean(formik.errors.ownedBy)}
              helperText={formik.touched.ownedBy && formik.errors.ownedBy}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              label="Current Location"
              name="currentLocation"
              fullWidth
              value={formik.values.currentLocation}
              onChange={formik.handleChange}
              error={
                formik.touched.currentLocation &&
                Boolean(formik.errors.currentLocation)
              }
              helperText={
                formik.touched.currentLocation && formik.errors.currentLocation
              }
            />
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <TextField
              label="Date of Purchase"
              name="dateofPurchase"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={formik.values.dateofPurchase}
              onChange={formik.handleChange}
              error={
                formik.touched.dateofPurchase &&
                Boolean(formik.errors.dateofPurchase)
              }
              helperText={
                formik.touched.dateofPurchase && formik.errors.dateofPurchase
              }
            />
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <TextField
              label="Purchased From"
              name="purchasedFrom"
              fullWidth
              value={formik.values.purchasedFrom}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <TextField
              label="Purchased Under"
              name="PurchasedUnder"
              fullWidth
              value={formik.values.PurchasedUnder}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <TextField
              label="Purchase Price (in INR)"
              name="purchasePrice"
              type="number"
              fullWidth
              value={formik.values.purchasePrice}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <TextField
              label="% of Depreciation"
              name="depreciation"
              type="number"
              fullWidth
              value={formik.values.depreciation}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <TextField
              label="Current Value"
              name="currentValue"
              type="number"
              fullWidth
              value={formik.values.currentValue}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" mt={4} gutterBottom>
          Insurance Details
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{xs:12, sm:4}}>
            <TextField
              label="Current Insurance Provider"
              name="currentInsuranceProvider"
              fullWidth
              value={formik.values.currentInsuranceProvider}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <TextField
              label="Policy Number"
              name="policyNumber"
              fullWidth
              value={formik.values.policyNumber}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <TextField
              label="Policy Type"
              name="policyType"
              fullWidth
              value={formik.values.policyType}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <TextField
              label="Policy Start Date"
              name="policyStartDate"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formik.values.policyStartDate}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <TextField
              label="Policy End Date"
              name="policyEndDate"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formik.values.policyEndDate}
              onChange={formik.handleChange}
              error={
                formik.touched.policyEndDate &&
                Boolean(formik.errors.policyEndDate)
              }
              helperText={
                formik.touched.policyEndDate && formik.errors.policyEndDate
              }
            />
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <TextField
              label="Policy Premium"
              name="policyPremium"
              fullWidth
              value={formik.values.policyPremium}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" mt={4} gutterBottom>
          Fitness Details
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              label="Last Fitness Renewal Date"
              name="lastFitnessRenewalDate"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formik.values.lastFitnessRenewalDate}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              label="Current Fitness Valid Upto"
              name="currentFitnessValidUpto"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formik.values.currentFitnessValidUpto}
              onChange={formik.handleChange}
              error={
                formik.touched.currentFitnessValidUpto &&
                Boolean(formik.errors.currentFitnessValidUpto)
              }
              helperText={
                formik.touched.currentFitnessValidUpto &&
                formik.errors.currentFitnessValidUpto
              }
            />
          </Grid>
        </Grid>

        <Typography variant="h6" mt={4} gutterBottom>
          Registration Renewal Details
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{xs:12, sm:4}}>
            <TextField
              label="First Reg. Valid Upto"
              name="firstRegValidUpto"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formik.values.firstRegValidUpto}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <TextField
              label="Renewal Date"
              name="renewalDate"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formik.values.renewalDate}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <TextField
              label="Renewal Valid Upto"
              name="renewalValidUpto"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formik.values.renewalValidUpto}
              onChange={formik.handleChange}
              error={
                formik.touched.renewalValidUpto &&
                Boolean(formik.errors.renewalValidUpto)
              }
              helperText={
                formik.touched.renewalValidUpto &&
                formik.errors.renewalValidUpto
              }
            />
          </Grid>
        </Grid>

        <Typography variant="h6" mt={4} gutterBottom>
          Additional Comments
        </Typography>
        <TextField
          name="addcomment"
          label="Additional Comments"
          multiline
          rows={4}
          fullWidth
          value={formik.values.addcomment}
          onChange={formik.handleChange}
        />

        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#004C99" }}
          >
            Update Vehicle
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditVehicle;