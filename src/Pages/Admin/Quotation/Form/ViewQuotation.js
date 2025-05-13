import React from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SearchIcon from "@mui/icons-material/Search";

const sampleData = {
  startStation: "Station A",
  destinationStation: "Station B",
  bookingDate: new Date(),
  deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  customerSearch: "John Doe",
  firstName: "John",
  middleName: "K.",
  lastName: "Doe",
  contactNumber: "9876543210",
  email: "john.doe@example.com",
  fromName: "ABC Logistics",
  fromGST: "27AAACB2230M1ZZ",
  fromLocality: "Main Street",
  fromState: "State A",
  fromCity: "City A",
  fromPin: "400001",
  toName: "XYZ Corp",
  toGST: "29AAACX2230M1ZZ",
  toLocality: "Industrial Area",
  toState: "State B",
  toCity: "City B",
  toPin: "560001",
  productDetails: [
    {
      NoOfParcel: "2",
      weightKgs: "10",
      amount: "1500",
      toPayPaid: "Paid",
    },
    {
      NoOfParcel: "1",
      weightKgs: "5",
      amount: "700",
      toPayPaid: "To Pay",
    },
  ],
  comments: "Handle with care. Deliver before 5 PM.",
  sgst: "9",
  grandTotal: "2200",
};

const ViewQuotation = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          View Customer Quotation
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Start Station"
              value={sampleData.startStation}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Destination Station"
              value={sampleData.destinationStation}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid size={{xs:12, sm:6}}>
            <DatePicker
              label="Booking Date"
              value={sampleData.bookingDate}
              readOnly
              renderInput={(params) => (
                <TextField fullWidth {...params} InputProps={{ readOnly: true }} />
              )}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <DatePicker
              label="Proposed Delivery Date"
              value={sampleData.deliveryDate}
              readOnly
              renderInput={(params) => (
                <TextField fullWidth {...params} InputProps={{ readOnly: true }} />
              )}
            />
          </Grid>

          <Grid size={{xs:12}}>
            <Typography fontWeight="bold">Customer Name/Number</Typography>
            <TextField
              fullWidth
              value={sampleData.customerSearch}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {["firstName", "middleName", "lastName"].map((name, index) => (
            <Grid size={{xs:12, sm:4}} key={index}>
              <TextField
                fullWidth
                label={name.replace(/([A-Z])/g, " $1")}
                value={sampleData[name]}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          ))}

          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Contact Number"
              value={sampleData.contactNumber}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Email"
              value={sampleData.email}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid size={{xs:12}}>
            <Typography variant="h6">From (Address)</Typography>
          </Grid>

          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Name"
              value={sampleData.fromName}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="GST Number"
              value={sampleData.fromGST}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Locality / Street"
              value={sampleData.fromLocality}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="State"
              value={sampleData.fromState}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="City"
              value={sampleData.fromCity}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Pin Code"
              value={sampleData.fromPin}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid size={{xs:12}}>
            <Typography variant="h6">To (Address)</Typography>
          </Grid>

          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Name"
              value={sampleData.toName}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="GST Number"
              value={sampleData.toGST}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Locality / Street"
              value={sampleData.toLocality}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="State"
              value={sampleData.toState}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="City"
              value={sampleData.toCity}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Pin Code"
              value={sampleData.toPin}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid size={{xs:12}}>
            <Typography variant="h6">Product Details</Typography>
          </Grid>

          {sampleData.productDetails.map((item, index) => (
            <Grid container spacing={2} key={index}>
              <Grid size={{xs:12, sm:3}}>
                <TextField
                  label="No. Of Parcel"
                  value={item.NoOfParcel}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Grid>
              <Grid size={{xs:12, sm:3}}>
                <TextField
                  label="Weight (Kgs)"
                  value={item.weightKgs}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Grid>
              <Grid size={{xs:12, sm:3}}>
                <TextField
                  label="Amount"
                  value={item.amount}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Grid>
              <Grid size={{xs:12, sm:3}}>
                <TextField
                  label="To Pay / Paid"
                  value={item.toPayPaid}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Grid>
            </Grid>
          ))}

          <Grid size={{xs:12}}>
            <TextField
              label="Additional Comments"
              value={sampleData.comments}
              multiline
              minRows={4}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid size={{xs:12, sm:6}}>
            <TextField
              label="SGST (%)"
              value={sampleData.sgst}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              label="Grand Total"
              value={sampleData.grandTotal}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default ViewQuotation;
