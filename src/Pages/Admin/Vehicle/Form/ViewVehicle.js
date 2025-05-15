import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import { LocalShipping as LocalShippingIcon } from "@mui/icons-material";

const generateRandomVehicleData = () => {
  const years = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - i
  );
  

  const models = ["Toyota Camry", "Honda Accord", "Ford F-150", "Chevrolet Silverado", "Tesla Model 3"];
  const locations = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
  const owners = ["John Smith", "Jane Doe", "ABC Transport", "XYZ Logistics"];
  const insuranceProviders = ["State Farm", "Geico", "Progressive", "Allstate"];
  const policyTypes = ["Comprehensive", "Third Party", "Collision"];

  const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
  };
  

  return {
    registrationNumber: `REG${Math.floor(1000 + Math.random() * 9000)}`,
    registrationDate: randomDate(new Date(2015, 0, 1), new Date()),
    regExpiryDate: randomDate(new Date(), new Date(2025, 11, 31)),
    vehicleModel: models[Math.floor(Math.random() * models.length)],
    manufactureYear: years[Math.floor(Math.random() * years.length)],
    ownedBy: owners[Math.floor(Math.random() * owners.length)],
    currentLocation: locations[Math.floor(Math.random() * locations.length)],
    dateofPurchase: randomDate(new Date(2015, 0, 1), new Date()),
    purchasedFrom: ["Dealer", "Private Seller", "Auction"][Math.floor(Math.random() * 3)],
    PurchasedUnder: ["Company", "Personal", "Lease"][Math.floor(Math.random() * 3)],
    purchasePrice: Math.floor(10000 + Math.random() * 50000),
    depreciation: Math.floor(5 + Math.random() * 20),
    currentValue: Math.floor(5000 + Math.random() * 30000),
    currentInsuranceProvider: insuranceProviders[Math.floor(Math.random() * insuranceProviders.length)],
    policyNumber: `POL${Math.floor(10000 + Math.random() * 90000)}`,
    policyType: policyTypes[Math.floor(Math.random() * policyTypes.length)],
    policyStartDate: randomDate(new Date(2022, 0, 1), new Date()),
    policyEndDate: randomDate(new Date(), new Date(2024, 11, 31)),
    policyPremium: Math.floor(500 + Math.random() * 2000),
    lastFitnessRenewalDate: randomDate(new Date(2021, 0, 1), new Date()),
    currentFitnessValidUpto: randomDate(new Date(), new Date(2024, 11, 31)),
    firstRegValidUpto: randomDate(new Date(2020, 0, 1), new Date(2023, 11, 31)),
    renewalDate: randomDate(new Date(2022, 0, 1), new Date()),
    renewalValidUpto: randomDate(new Date(), new Date(2025, 11, 31)),
    addcomment: "Regular maintenance performed. No major accidents reported.",
  };
};

const ViewVehicle = () => {
  const vehicleData = generateRandomVehicleData();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box p={3} bgcolor="#f5f7f6">
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Vehicle Details
        </Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <LocalShippingIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
          <Typography variant="h5">
            {vehicleData.vehicleModel} ({vehicleData.manufactureYear})
          </Typography>
        </Box>
        <Typography variant="subtitle1" color="text.secondary">
          Registration: {vehicleData.registrationNumber}
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Basic Information
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Registration Number
            </Typography>
            <Typography variant="body1">{vehicleData.registrationNumber}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Registration Date
            </Typography>
            <Typography variant="body1">{formatDate(vehicleData.registrationDate)}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Registration Expiry
            </Typography>
            <Typography variant="body1">{formatDate(vehicleData.regExpiryDate)}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Make/Model
            </Typography>
            <Typography variant="body1">{vehicleData.vehicleModel}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Year of Manufacture
            </Typography>
            <Typography variant="body1">{vehicleData.manufactureYear}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Owned By
            </Typography>
            <Typography variant="body1">{vehicleData.ownedBy}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Current Location
            </Typography>
            <Typography variant="body1">{vehicleData.currentLocation}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Purchase Information
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Date of Purchase
            </Typography>
            <Typography variant="body1">{formatDate(vehicleData.dateofPurchase)}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Purchased From
            </Typography>
            <Typography variant="body1">{vehicleData.purchasedFrom}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Purchased Under
            </Typography>
            <Typography variant="body1">{vehicleData.PurchasedUnder}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Purchase Price
            </Typography>
            <Typography variant="body1">{formatCurrency(vehicleData.purchasePrice)}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Depreciation (%)
            </Typography>
            <Typography variant="body1">{vehicleData.depreciation}%</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Current Value
            </Typography>
            <Typography variant="body1">{formatCurrency(vehicleData.currentValue)}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Insurance Details
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Insurance Provider
            </Typography>
            <Typography variant="body1">{vehicleData.currentInsuranceProvider}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Policy Number
            </Typography>
            <Typography variant="body1">{vehicleData.policyNumber}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Policy Type
            </Typography>
            <Typography variant="body1">{vehicleData.policyType}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Policy Start Date
            </Typography>
            <Typography variant="body1">{formatDate(vehicleData.policyStartDate)}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Policy End Date
            </Typography>
            <Typography variant="body1">{formatDate(vehicleData.policyEndDate)}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Policy Premium
            </Typography>
            <Typography variant="body1">{formatCurrency(vehicleData.policyPremium)}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Fitness & Registration Details
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Last Fitness Renewal
            </Typography>
            <Typography variant="body1">{formatDate(vehicleData.lastFitnessRenewalDate)}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Fitness Valid Until
            </Typography>
            <Typography variant="body1">{formatDate(vehicleData.currentFitnessValidUpto)}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              First Registration Valid Until
            </Typography>
            <Typography variant="body1">{formatDate(vehicleData.firstRegValidUpto)}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Last Renewal Date
            </Typography>
            <Typography variant="body1">{formatDate(vehicleData.renewalDate)}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Renewal Valid Until
            </Typography>
            <Typography variant="body1">{formatDate(vehicleData.renewalValidUpto)}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Additional Comments
        </Typography>
        <Typography variant="body1" paragraph>
          {vehicleData.addcomment}
        </Typography>
      </Paper>

    
    </Box>
  );
};

export default ViewVehicle;